const {
  global,
  endpoint,
  dispatchState,
  dispatchEvent,
  registerEvent,
  renderPlasmicElement,
  plasmicRootClassName,
} = props;

const { selectedIndexer } = global || {};

const accountId = selectedIndexer?.accountId || "roshaan.near";
const indexerName = selectedIndexer?.indexerName || "demo-2";

const LIMIT = 20;

State.init({
  logs: [],
  state: [],
  indexer_res: [],
  logsPage: 0,
  statePage: 0,
  logsCount: 0,
  stateCount: 0,
  indexer_resPage: 0,
  indexer_resCount: 0,
  current: selectedIndexer,
});

function fetchGraphQL(operationsDoc, operationName, variables) {
  return asyncFetch(`${endpoint}/v1/graphql`, {
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
        indexer_log_entries(order_by: {timestamp: desc}, limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexerName}"}}) {
          block_height
          message
          timestamp
        }
        indexer_log_entries_aggregate(where: {function_name: {_eq: "${accountId}/${indexerName}"}}) {
        aggregate {
          count
        }
      }
    }
  `;

const indexerStateDoc = `
    query IndexerState($offset: Int) {
      indexer_state(limit: ${LIMIT}, offset: $offset, where: {function_name: {_eq: "${accountId}/${indexerName}"}}) {
        status
        function_name
        current_block_height
        current_historical_block_height
      }
    }
  `;

const isEquals =
  state.current.accountId === accountId &&
  state.current.indexerName === indexerName;

if (!state.initialFetch || !isEquals) {
  State.update({ current: selectedIndexer });

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
  <div
    className={plasmicRootClassName}
  >
    {state.logs.length > 0 ? (
      <>
        {renderPlasmicElement("table", {
          children: (
            <>
              {renderPlasmicElement("thead", {
                children: (
                  <tr>
                    {renderPlasmicElement("th", {
                      children: "Block Height",
                    })}
                    {renderPlasmicElement("th", {
                      children: "Timestamp",
                    })}
                    {renderPlasmicElement("th", {
                      children: "Message",
                    })}
                  </tr>
                ),
              })}

              {renderPlasmicElement("tbody", {
                children: state.logs.map((x, i) => (
                  <tr key={x.block_height + "" + i}>
                    {renderPlasmicElement("td", {
                      children: x.block_height,
                    })}
                    {renderPlasmicElement("td", {
                      children: x.timestamp,
                    })}
                    {renderPlasmicElement("td", {
                      children: x.message,
                    })}
                  </tr>
                )),
              })}
            </>
          ),
        })}
      </>
    ) : (
      <span> No data to show... </span>
    )}
  </div>
);
