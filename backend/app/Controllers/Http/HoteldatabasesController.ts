import { HttpContext } from '@adonisjs/core/build/standalone'
import Database from "@ioc:Adonis/Lucid/Database"
import Hoteldatabase from 'App/Models/Hoteldatabase'

export default class HoteldatabasesController {

    public async address({ response }: HttpContext) {
        // const add = await Database.rawQuery("select concat(street, ', ', landmark, ', ', city, ', ', pincode) as address from hoteldatabases")
        // const data = add.rows
        // return response.json({data})
        const address = await Database
            .from('hoteldatabases')
            .select('street', 'landmark', 'city', 'pincode')
        return response.json({ address })
    }

    public async customerName() {
        const customerData = Database
            .from('hoteldatabases')
            .leftJoin('customers', 'customers.id', '=', 'hoteldatabases.customer_id')
            .select('customers.customer_name')
            .orderBy('hoteldatabases.id', 'asc')
        return customerData
    }

    public async displayData({ }: HttpContext) {
        const user = await Hoteldatabase.all()
        return user
    }
    public async insertData({ request, response }: HttpContext) {
        const dataInsert = new Hoteldatabase()
        dataInsert.id = request.input('id')
        dataInsert.customer_id = request.input('customer_id')
        dataInsert.hotel_name = request.input('hotel_name')
        dataInsert.door_no = request.input('doorno')
        dataInsert.street = request.input('street')
        dataInsert.landmark = request.input('landmark')
        dataInsert.city = request.input('city')
        dataInsert.pincode = request.input('pincode')
        await dataInsert.save()
        const address = dataInsert.street + ", " + dataInsert.landmark + ", " + dataInsert.city + ", " + dataInsert.pincode
        return response.json({ address })
    }
    public async editData({ request }) {
        const editInsert = await Hoteldatabase.findByOrFail('id', request.params().id)
        editInsert.customer_id = request.input('customer_id')
        editInsert.hotel_name = request.input('hotel_name')
        editInsert.door_no = request.input('door_no')
        editInsert.street = request.input('street')
        editInsert.landmark = request.input('landmark')
        editInsert.city = request.input('city')
        editInsert.pincode = request.input('pincode')
        await editInsert.save()
        return editInsert
    }
    public async deleteData({ request }) {
        const deleteItem = await Hoteldatabase.findByOrFail('id', request.params().id)
        deleteItem.delete()
        await deleteItem.save()
    }
    public async searchQuery({ request }: HttpContext) {
        var data = request.input('term')
        const searchData = await Database
            .from('hoteldatabases')
            .select('*')
            .where((query) => {
                if (/^[0-9]/.test(data)) {
                    query
                        .where('id', data)
                        .orWhere('customer_id', data)
                        .orWhere('door_no', data)
                        .orWhere('pincode', data)
                }
            })
            .orWhere((query: any) => {
                query
                    .where("hotel_name", "ilike", `%${data}%`)
                    .orWhere("street", "ilike", `%${data}%`)
                    .orWhere("landmark", "ilike", `%${data}%`)
                    .orWhere("city", "ilike", `%${data}%`)
            })
        return searchData
    }

    public async sortAscending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('hoteldatabases').select('*').orderBy(`${columnName}`, `asc`)
        return sort
    }

    public async sortDescending({ request }: HttpContext) {
        const columnName = request.input('columnName')
        const sort = await Database.from('hoteldatabases').select('*').orderBy(`${columnName}`, `desc`)
        return sort
    }

}
