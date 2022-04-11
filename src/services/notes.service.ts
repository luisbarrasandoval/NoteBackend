import INotes from '../interfaces/notes.interface';
import notesModel from '../models/notes.model';

import { Types } from 'mongoose';
import FilterNotesDto from '../dto/filter.notes.dto';

const getAll = async (
  userID: Types.ObjectId | undefined,
  filter: FilterNotesDto
) => {
  const pages: any = { }; // eslint-disable-line
  const search: any = { userID }; // eslint-disable-line @typescript-eslint/no-explicit-any
  const sort: any = {}; // eslint-disable-line


  if (filter.limit)                    pages['limit'] = filter.limit
  if (filter.skip && filter.limit > 0) pages['skip'] = filter.limit * (filter.skip - 1);

  if (filter.search)    search['title'] = { $regex: filter.search, $options: 'i' };
  if (filter.prioridad) search['prioridad'] = filter.prioridad;
  if (filter.categoria) search['categoria'] = filter.categoria;
  if (filter.complete != undefined) search['complete'] = filter.complete;

  if (filter.order_by) sort[filter.order_by] = filter.order_type || -1;
  if (filter.order_type) {
    if (!filter.order_by) {
      pages['sort'] = {
        create_at: filter.order_type === 'asc' ? 1 : -1
      }
    } else {
      sort[filter.order_by] = filter.order_type === 'asc' ? 1 : -1;
    }
  }

  console.log("===================")
  console.log(search)
  console.log(pages)
  console.log(sort)
  console.log(filter)
  console.log("===================")

  const notes = await notesModel.find(search, null, pages);
  const total = await notesModel.countDocuments({ userID });

  return {
    page: filter.skip,
    limit: filter.limit,
    length: notes.length,
    total,
    notes
  };
};

const getById = async (userID: Types.ObjectId | undefined, id: string) => {
  const result = await notesModel.findOne({ userID, _id: id });
  return result;
};

const create = async (userID: Types.ObjectId | undefined, todo: INotes) => {
  const t = new notesModel({
    ...todo,
    create_at: new Date(),
    userID
  });

  const save = await t.save();
  return save;
};

const remove = async (userID: Types.ObjectId | undefined, id: string) => {
  const state = await notesModel.findOneAndDelete({ userID, _id: id });
  return state;
};

const update = async (
  userID: Types.ObjectId | undefined,
  id: string,
  data: Partial<INotes>
) => {
  const todo = await notesModel.findOneAndUpdate({ userID, _id: id }, data);
  return { ...todo, ...data };
};

export { getAll, getById, create, remove, update };
