import {Shipment} from "./shipment";
import {Payment} from "./payment";

export interface InitData
{
  shipments: Array<Shipment>;
  payments: Array<Payment>;
}
