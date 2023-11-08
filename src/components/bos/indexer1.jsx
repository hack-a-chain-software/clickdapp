export const Indexer1 = () => {
  //props indexer_name
  const indexer_name = "social_feed";

  const LIMIT = 20;

  const accountId = "dataplatform.near";

  if (!indexer_name) return "missing indexer_name";

  let v1_endpoint = `https://near-queryapi.api.pagoda.co`;

  let v2_endpoint = `https://queryapi-hasura-graphql-mainnet-vcqilefdcq-ew.a.run.app`;

  let graphQLEndpoint = state.v2Toggle ? v2_endpoint : v1_endpoint;

  State.init({
    logs: [],
    state: [],
    indexer_res: [],
    indexer_resCount: 0,
    logsCount: 0,
    stateCount: 0,
    indexer_resPage: 0,
    logsPage: 0,
    statePage: 0,
    v2Toggle: Storage.get("QueryAPIV2Toggle") || false,
  });

  function fetchGraphQL(operationsDoc, operationName, variables) {
    return asyncFetch(`${graphQLEndpoint}/v1/graphql`, {
      method: "POST",
      headers: {
        "x-hasura-role": "append",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    });
  }

  const logsDoc = `
      query QueryLogs($offset: Int) {
        indexer_log_entries(order_by: {timestamp: desc}, limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
          block_height
          message
          timestamp
        }
        indexer_log_entries_aggregate(where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
        aggregate {
          count
        }
      }
    }
  `;

  const indexerStateDoc = `
    query IndexerState($offset: Int) {
      indexer_state(limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexer_name}"}}) {
        status
        function_name
        current_block_height
        current_historical_block_height
      }
    }
  `;

  const prevV2ToggleSelected = Storage.get("QueryAPIV2Toggle");

  if (!state.initialFetch || prevV2ToggleSelected !== state.v2Toggle) {
    Storage.set("QueryAPIV2Toggle", state.v2Toggle);
    fetchGraphQL(logsDoc, "QueryLogs", {
      offset: state.logsPage * LIMIT,
    }).then((result) => {
      if (result.status === 200) {
        State.update({
          logs: result.body.data[`indexer_log_entries`],
          logsCount:
            result.body.data[`indexer_log_entries_aggregate`].aggregate.count,
        });
      }
    });

    fetchGraphQL(indexerStateDoc, "IndexerState", {
      offset: 0,
    }).then((result) => {
      if (result.status === 200) {
        if (result.body.data.indexer_state.length == 1) {
          State.update({
            state: result.body.data.indexer_state,
            stateCount: result.body.data.indexer_state_aggregate.aggregate.count,
          });
        }
      }
    });
    State.update({ initialFetch: true });
  }

  const onLogsPageChange = (page) => {
    page = page - 1;

    if (page === state.logsPage) {
      console.log(`Selected the same page number as before: ${pageNumber}`);
      return;
    }

    try {
      fetchGraphQL(logsDoc, "QueryLogs", { offset: page * LIMIT }).then(
        (result) => {
          if (result.status === 200) {
            State.update({
              logs: result.body.data.indexer_log_entries,
              logsCount:
                result.body.data.indexer_log_entries_aggregate.aggregate.count,
            });
          }
        }
      );
    } catch (e) {
      console.log("error:", e);
    }

    State.update({ logsPage: page, currentPage: page });
  };

  return (
    <Card>
      <CardBody>
        <SmallTitle>Indexer State </SmallTitle>

        {state.state.length > 0 ? (
          <div class="table-responsive mt-3">
            <table
              class="table-striped table"
              style={{
                padding: "30px",
                "table-layout": "fixed",
              }}
            >
              <thead>
                <tr>
                  <th>Function Name</th>
                  <th>Current Block Height</th>
                  <th>Current Historical Block Height</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {state.state.map((x) => (
                  <tr>
                    <TableElement>{x.function_name}</TableElement>
                    <TableElement>{x.current_block_height}</TableElement>
                    <TableElement>
                      {x.current_historical_block_height}
                    </TableElement>
                    <TableElement>{x.status}</TableElement>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Subheading> No data to show... </Subheading>
        )}

        <SmallTitle> Indexer Logs</SmallTitle>

        {state.logs.length > 0 ? (
          <div>
            <div class="table-responsive mt-3">
              <table
                class="table-striped table"
                style={{
                  padding: "30px",
                  "table-layout": "fixed",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>Block Height</th>
                    <th style={{ width: "20%" }}>Timestamp</th>
                    <th style={{ width: "80%" }}>Message</th>
                  </tr>
                </thead>

                <tbody>
                  {state.logs.map((x) => (
                    <tr>
                      <TableElement>{x.block_height}</TableElement>
                      <TableElement>{x.timestamp}</TableElement>
                      <TableElement>{x.message}</TableElement>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Widget
              src="roshaan.near/widget/Paginate-fork"
              props={{
                siblingCount: 1,
                totalCount: state.logsCount,
                pageSize: LIMIT,
                onPageChange: onLogsPageChange,
                currentPage: state.logsPage,
              }}
            />
          </div>
        ) : (
          <Subheading> No data to show... </Subheading>
        )}
      </CardBody>
    </Card>
  );
}
