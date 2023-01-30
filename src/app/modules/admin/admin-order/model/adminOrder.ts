import { AdminOrderRow } from "./adminOrderRow"
import { AdminPayment } from "./adminPayment"

export interface AdminOrder{
    id: number,
    placeDate: Date,
    orderStatus: string,
    orderRows: Array<AdminOrderRow>
    grossValue: number,
    firstName: string,
    lastName: string,
    street: string,
    zipCode: string,
    city: string,
    email: string,
    phone: string,
    payment: AdminPayment
}
