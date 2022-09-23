import { HttpContext } from "@adonisjs/core/build/standalone";
import Database from "@ioc:Adonis/Lucid/Database";
import Cust from "App/Models/Cust";


export default class CustsController {

    public async count({ }: HttpContext) {
        const countData = Database
            .from('custs')
            .leftJoin('hoteldatabases', 'custs.customer_id', '=', 'hoteldatabases.customer_id')
            .groupBy('custs.customer_name')
            .select('custs.customer_name')
            .count('hoteldatabases.customer_id')
        return countData
    }


    public async displayData({ }: HttpContext) {
        const user = await Cust.all()
        return user
    }
    public async inserData({ request, response }: HttpContext) {
        const dataInsert = new Cust();
        dataInsert.id = request.input('id');
        dataInsert.customer_id = request.input('customer_id');
        dataInsert.customer_name = request.input('customer_name');
        await dataInsert.save()
        return response.json({ dataInsert })
    }
    public async editData({ request }: HttpContext) {
        const editInsert = await Cust.findByOrFail('id', request.params().id)
        editInsert.customer_id = request.input('customer_id')
        editInsert.customer_name = request.input('customer_name')
        await editInsert.save()
        return editInsert
    }
    public async deleteData({ request }: HttpContext) {
        const deleteItem = await Cust.findByOrFail('id', request.params().id)
        deleteItem.delete()
        await deleteItem.save()
        return deleteItem
    }
    public async searchQuery({ request }: HttpContext) {
        var data = request.input('term')
        const searchData = await Database
            .from('custs')
            .select('*')
            .where((query) => {
                if (/^[0-9]/.test(data)) {
                    query.where('customer_id', data)
                }
            })
            .orWhere((query: any) => {
                query
                    .where("customer_name", "ilike", `%${data}%`)
            })
        return searchData
    }

    public async sortAscending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('custs').select('*').orderBy(`${columnName}`, `asc`)
        return sort
    }

    public async sortDescending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('custs').select('*').orderBy(`${columnName}`, `desc`)
        return sort
    }
}
