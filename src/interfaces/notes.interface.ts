import {Types} from 'mongoose';

interface INotes {

    _id: string;
    create_at: string;
    userID: Types.ObjectId;
    title: string;
    status: boolean;
    detail: string;
    prioridad: number;
    categoria: string;

}

export default INotes;
