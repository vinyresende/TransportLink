import User from "@/database/models/User"
import Route from "@/database/models/Route"
import Passenger from "@/database/models/Passenger"

import { Option } from "@/components/form-kit/types"

export type ResponseDataItems = Route | Route[] | Passenger | Passenger[] | string | string[] | number | Option | Option[] | User | Blob | null
export type ResponseData<T extends ResponseDataItems = ResponseDataItems> = Record<string, T>

export interface Response<ResponseDataBody extends ResponseData = ResponseData> {
    ok: boolean
    status: number
    data?: ResponseDataBody
    error?: Error | string | unknown
}
