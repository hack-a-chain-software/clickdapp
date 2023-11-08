// export const Indexer = (props) => {
//   const accountId = context.accountId;

//   const [selected_accountId, selected_indexerName] = props.selectedIndexerPath
//     ? props.selectedIndexerPath.split("/")
//     : [undefined, undefined];

//   const activeTab = props.view ?? "indexers";

//   const REGISTRY_CONTRACT_ID = props.REGISTRY_CONTRACT_ID || "queryapi.dataplatform.near";

//   const APP_OWNER = props.APP_OWNER || "dataplatform.near";

//   const GRAPHQL_ENDPOINT = props.GRAPHQL_ENDPOINT || "https://queryapi-hasura-graphql-24ktefolwq-ew.a.run.app";

//   const EXTERNAL_APP_URL = props.EXTERNAL_APP_URL || "https://queryapi-frontend-24ktefolwq-ew.a.run.app";

//   let appPath = props.isDev ? "dev-App" : "App";

//   State.init({
//     my_indexers: [],
//     all_indexers: [],
//     activeTab: activeTab,
//     selected_indexer: undefined,
//     selected_account: undefined,
//   });

//   Near.asyncView(
//     REGISTRY_CONTRACT_ID,
//     "list_indexer_functions"
//   ).then((data) => {
//     const indexers = [];

//     const total_indexers = 0;

//     Object.keys(data.All).forEach((accountId) => {
//       Object.keys(data.All[accountId]).forEach((functionName) => {
//         indexers.push({
//           accountId: accountId,
//           indexerName: functionName,
//         });

//         total_indexers += 1;
//       });
//     });

//     let my_indexers = indexers.filter(
//       (indexer) => indexer.accountId === accountId
//     );

//     State.update({
//       my_indexers: my_indexers,
//       all_indexers: indexers,
//       totalIndexers: total_indexers,
//     });
//   });

//   const indexerView = (accountId, indexerName) => {
//     const editUrl = `https://near.org/#/${APP_OWNER}/widget/QueryApi.${appPath}?selectedIndexerPath=${accountId}/${indexerName}&view=editor-window`;
//     const statusUrl = `https://near.org/#/${APP_OWNER}/widget/QueryApi.${appPath}?selectedIndexerPath=${accountId}/${indexerName}&view=indexer-status`;
//     // const playgroundLink = `https://near.org/#/${APP_OWNER}/widget/QueryApi.App?selectedIndexerPath=${accountId}/${indexerName}&view=editor-window&tab=playground`;
//     const playgroundLink = `https://cloud.hasura.io/public/graphiql?endpoint=${GRAPHQL_ENDPOINT}/v1/graphql&header=x-hasura-role%3A${accountId.replaceAll(
//       ".",
//       "_"
//     )}`;

//     return (
//       <Card>
//         <CardBody>
//           <Thumbnail>
//             <Widget
//               src="mob.near/widget/Image"
//               props={{
//                 image: metadata.image,
//                 fallbackUrl:
//                   "https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg",
//                 alt: "Near QueryApi indexer",
//               }}
//             />
//           </Thumbnail>

//           <div>
//             <TextLink as="a" bold ellipsis>
//               {indexerName}
//             </TextLink>
//             <TextLink as="a" ellipsis>
//               @{accountId}
//             </TextLink>
//           </div>
//         </CardBody>

//         <CardFooter className="flex justify-center items-center">
//           <ButtonLink
//             onClick={() => {
//               State.update({
//                 activeTab: "indexer-status",
//               });
//               history.pushState(
//                 {},
//                 "Indexer Status",
//                 window.location.href.replace(
//                   /view=\w+\-\w+/,
//                   `view=indexer-status`
//                 )
//               );
//             }}
//           >
//             View Status
//           </ButtonLink>

//           <ButtonLink
//             primary
//             onClick={() => {
//               State.update({
//                 activeTab: "editor-window",
//               });
//               history.pushState(
//                 {},
//                 "Editor Window",
//                 window.location.href.replace(
//                   /view=\w+\-\w+/,
//                   `view=editor-window`
//                 )
//               );
//             }}
//           >
//             {accountId === context.accountId ? "Edit Indexer" : "View Indexer"}
//           </ButtonLink>

//           <ButtonLink href={playgroundLink} target="_blank">
//             View In Playground
//           </ButtonLink>
//         </CardFooter>
//       </Card>
//     );
//   };

//   return (
//     <Wrapper
//       negativeMargin={state.activeTab === "indexers"}
//     >
//       <Tabs>
//         <TabsButton
//           type="button"
//           onClick={() => State.update({ activeTab: "indexers" })}
//           selected={state.activeTab === "indexers"}
//         >
//           Indexers
//         </TabsButton>
//         {props.view === "create-new-indexer" && (
//           <TabsButton
//             type="button"
//             onClick={() => State.update({ activeTab: "create-new-indexer" })}
//             selected={state.activeTab === "create-new-indexer"}
//           >
//             Create New Indexer
//           </TabsButton>
//         )}

//         {props.selectedIndexerPath && (
//           <>
//             <TabsButton
//               type="button"
//               onClick={() => {
//                 console.log("url", history.pushState, window.history.pushState);
//                 window.history.pushState(
//                   {},
//                   "Editor",
//                   window.location.href.replace(
//                     /view=\w+\-\w+/,
//                     `view=editor-window`
//                   )
//                 );
//                 //   window.history.pushState(
//                 //     {},
//                 //     "Editor",
//                 //     window.location.href.replace(
//                 //       /view=\w+\-\w+/,
//                 //       `view=editor-window`
//                 //     )
//                 //   );
//                 State.update({ activeTab: "editor-window" });
//               }}
//               selected={state.activeTab === "editor-window"}
//             >
//               Indexer Editor
//             </TabsButton>

//             <TabsButton
//               type="button"
//               onClick={() => {
//                 console.log("url", history.pushState, window.history.pushState);
//                 window.history.pushState(
//                   {},
//                   "Indexer Status",
//                   window.location.href.replace(
//                     /view=\w+\-\w+/,
//                     `view=indexer-status`
//                   )
//                 );
//                 //   window.history.pushState(
//                 //     {},
//                 //     "Indexer Status",
//                 //     window.location.href.replace(
//                 //       /view=\w+\-\w+/,
//                 //       `view=indexer-status`
//                 //     )
//                 //   );
//                 State.update({ activeTab: "editor-window" });
//               }}
//               selected={state.activeTab === "indexer-status"}
//             >
//               Indexer Status
//             </TabsButton>
//           </>
//         )}
//       </Tabs>
//       <Main>
//         <Section active={state.activeTab === "indexers"}>
//           <NavBarLogo
//             href={`https://near.org/#/${APP_OWNER}/widget/QueryApi.${appPath}`}
//             title="QueryApi"
//             onClick={() => {
//               State.update({
//                 activeTab: "indexers",
//               });
//             }}
//           >
//             <Widget
//               src="mob.near/widget/Image"
//               props={{
//                 className: "d-inline-block align-text-top me-2",
//                 image: metadata.image,
//                 style: { height: "24px" },
//                 fallbackUrl:
//                   "https://upload.wikimedia.org/wikipedia/commons/8/86/Database-icon.svg",
//                 alt: "the queryapi logo",
//               }}
//             />
//             QueryApi
//           </NavBarLogo>

//           <div>
//             <ButtonLink
//               href={`/#/${APP_OWNER}/widget/QueryApi.${appPath}/?view=create-new-indexer`}
//               style={{ "margin-top": "10px" }}
//               onClick={() =>
//                 State.update({
//                   activeTab: "create-new-indexer",
//                   selected_indexer: "",
//                 })
//               }
//             >
//               Create New Indexer
//             </ButtonLink>
//             {state.my_indexers.length > 0 && (
//               <H2>
//                 {accountId}'s Indexers
//                 <span>({state.my_indexers.length})</span>
//               </H2>
//             )}
//             <Widget
//               src={`${APP_OWNER}/widget/QueryApi.IndexerExplorer`}
//               props={{
//                 GRAPHQL_ENDPOINT,
//                 REGISTRY_CONTRACT_ID,
//                 APP_OWNER,
//                 appPath,
//               }}
//             />
//           </div>
//         </Section>
//         <Section
//           negativeMargin
//           primary
//           active={state.activeTab === "create-new-indexer"}
//         >
//           {state.activeTab === "create-new-indexer" && (
//             <div>
//               <Widget
//                 src={`${APP_OWNER}/widget/QueryApi.Editor`}
//                 props={{
//                   indexerName:
//                     selected_indexerName ?? state.indexers[0].indexerName,
//                   accountId: selected_accountId ?? state.indexers[0].accountId,
//                   path: "create-new-indexer",
//                   EXTERNAL_APP_URL,
//                   REGISTRY_CONTRACT_ID,
//                   GRAPHQL_ENDPOINT,
//                   APP_OWNER,
//                 }}
//               />
//             </div>
//           )}
//         </Section>
//         <Section active={state.activeTab === "indexer-status"}>
//           {state.activeTab === "indexer-status" && (
//             <div>
//               {state.indexers.length > 0 &&
//                 (state.selected_indexer != "" ? (
//                   <H2>{state.selected_indexer}</H2>
//                 ) : (
//                   <H2>{state.indexers[0].indexerName}</H2>
//                 ))}
//               {indexerView(
//                 selected_accountId ?? state.indexers[0].accountId,
//                 selected_indexerName ?? state.indexers[0].indexerName
//               )}
//               <Widget
//                 src={`${APP_OWNER}/widget/QueryApi.IndexerStatus`}
//                 props={{
//                   indexer_name:
//                     selected_indexerName ?? state.indexers[0].indexerName,
//                   accountId: selected_accountId ?? state.indexers[0].accountId,
//                   EXTERNAL_APP_URL,
//                   REGISTRY_CONTRACT_ID,
//                   GRAPHQL_ENDPOINT,
//                   APP_OWNER,
//                 }}
//               />
//             </div>
//           )}
//         </Section>
//         <Section
//           negativeMargin
//           primary
//           active={state.activeTab === "editor-window"}
//         >
//           {state.activeTab === "editor-window" && (
//             <div>
//               {state.indexers.length > 0 &&
//                 (state.selected_indexer != undefined ? (
//                   <H2>{state.selected_indexer}</H2>
//                 ) : (
//                   <H2>{`${state.indexers[0].accountId}/${state.indexers[0].indexerName}`}</H2>
//                 ))}
//               <Widget
//                 src={`${APP_OWNER}/widget/QueryApi.Editor`}
//                 props={{
//                   indexerName:
//                     selected_indexerName ?? state.indexers[0].indexerName,
//                   accountId: selected_accountId ?? state.indexers[0].accountId,
//                   path: "query-api-editor",
//                   tab: props.tab,
//                   EXTERNAL_APP_URL,
//                   REGISTRY_CONTRACT_ID,
//                   GRAPHQL_ENDPOINT,
//                   APP_OWNER,
//                 }}
//               />
//             </div>
//           )}
//           {state.activeTab === "create-new-indexer" && (
//             <div>
//               {state.indexers.length > 0 &&
//                 (state.selected_indexer != undefined ? (
//                   <H2>{state.selected_indexer}</H2>
//                 ) : (
//                   <H2>{`${state.indexers[0].accountId}/${state.indexers[0].indexerName}`}</H2>
//                 ))}
//               <Widget
//                 src={`${APP_OWNER}/widget/QueryApi.Editor`}
//                 props={{
//                   indexerName:
//                     selected_indexerName ?? state.indexers[0].indexerName,
//                   accountId: selected_accountId ?? state.indexers[0].accountId,
//                   path: "create-new-indexer",
//                   EXTERNAL_APP_URL,
//                   REGISTRY_CONTRACT_ID,
//                   GRAPHQL_ENDPOINT,
//                   APP_OWNER,
//                 }}
//               />
//             </div>
//           )}
//         </Section>
//       </Main>
//     </Wrapper>
//   );

// }
