import { ElementAction, DataTableState } from "../DataTable/types"

export interface KeyValueObject {
  key: string;
  value: string;
}

export interface FeedElement {
  id: string;
  heading: string;
  subHeading?: string;
  timeStamp?: string;
  img_src?: string;
  img_type?: "avatar" | "small" | "medium";
  content: string | KeyValueObject[];
  actions?: ElementAction[];
}

export interface FeedProps { }

export interface DataFeedProps extends DataTableState { }