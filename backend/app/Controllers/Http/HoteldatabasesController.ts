import { HttpContext } from '@adonisjs/core/build/standalone'
import Database from "@ioc:Adonis/Lucid/Database"
import Hoteldatabase from 'App/Models/Hoteldatabase'

export default class HoteldatabasesController{
    public displayData() {
        return Database.from('hoteldatabases').select('*').orderBy('id')
    }
    public async insertData({ request }: HttpContext) {
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
        return dataInsert
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

}
