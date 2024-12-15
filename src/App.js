import React from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";

import { Navbar, CustomResultView, CustomSearchInput } from "./components";
import "./App.css";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase,
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig(),
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <SearchProvider config={config}>
        <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
          {({ wasSearched }) => {
            return (
              <div className="flex items-center justify-center">
                <div className="App customization-example w-[80%]">
                  <ErrorBoundary>
                    <Layout
                      header={
                        <SearchBox
                          className="custom-searchbox"
                          autocompleteSuggestions={true}
                        />
                      }
                      sideContent={
                        <div>
                          {wasSearched && (
                            <Sorting
                              label={"Sort by"}
                              sortOptions={buildSortOptionsFromConfig()}
                            />
                          )}
                          {getFacetFields().map((field) => (
                            <Facet key={field} field={field} label={field} />
                          ))}
                        </div>
                      }
                      bodyContent={
                        <div className="mt-5">
                          <Results
                            titleField={getConfig().titleField}
                            urlField={getConfig().urlField}
                            thumbnailField={getConfig().thumbnailField}
                            shouldTrackClickThrough={true}
                            resultView={(props) => (
                              <CustomResultView {...props} />
                            )}
                          />
                        </div>
                      }
                      bodyHeader={
                        <React.Fragment>
                          {wasSearched && <PagingInfo />}
                          {wasSearched && <ResultsPerPage />}
                        </React.Fragment>
                      }
                      bodyFooter={<Paging />}
                    />
                  </ErrorBoundary>
                </div>
              </div>
            );
          }}
        </WithSearch>
      </SearchProvider>

      <div className="h-[50px] w-full bg-black bottom-0"></div>
    </div>
  );
}
