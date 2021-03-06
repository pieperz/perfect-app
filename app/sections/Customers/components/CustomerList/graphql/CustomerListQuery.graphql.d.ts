import { DocumentNode } from "graphql-typed";
export namespace CustomerListQueryPartialData {
  export interface CustomersEdgesNode {
    __typename?: "Customer" | null;
    id?: string | null;
    displayName?: string | null;
  }
  export interface CustomersEdges {
    __typename?: "CustomerEdge" | null;
    node?: CustomerListQueryPartialData.CustomersEdgesNode | null;
  }
  export interface Customers {
    __typename?: "CustomerConnection" | null;
    edges?: (CustomerListQueryPartialData.CustomersEdges | null)[] | null;
  }
}
export interface CustomerListQueryPartialData {
  customers?: CustomerListQueryPartialData.Customers | null;
}
export namespace CustomerListQueryData {
  export interface CustomersEdgesNode {
    __typename: "Customer";
    id: string;
    displayName: string;
  }
  export interface CustomersEdges {
    __typename: "CustomerEdge";
    node: CustomerListQueryData.CustomersEdgesNode;
  }
  export interface Customers {
    __typename: "CustomerConnection";
    edges: CustomerListQueryData.CustomersEdges[];
  }
}
export interface CustomerListQueryData {
  customers: CustomerListQueryData.Customers;
}
declare const document: DocumentNode<CustomerListQueryData, never, CustomerListQueryPartialData>;
export default document;