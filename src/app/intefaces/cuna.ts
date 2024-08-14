import { Bebe } from "./bebe";

export interface Cuna {
    id: number;
    numserie: string;
    apodo: string;
    active: number;
    user_id: number;
    bebe_id: number;
    created_at: string;
    updated_at: string;
    bebes?: Bebe;
}
