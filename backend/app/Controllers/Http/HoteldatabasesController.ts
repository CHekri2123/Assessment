import { HttpContext } from '@adonisjs/core/build/standalone'
import Database from "@ioc:Adonis/Lucid/Database"
import Hoteldatabase from 'App/Models/Hoteldatabase'
import HotelValidator from 'App/Validators/HotelValidator'

export default class HoteldatabasesController {


    public async displayData({ }: HttpContext) {

        const data = await Hoteldatabase.query()

            .select('hoteldatabases.*')
            .select('custs.customer_name as customer_name')
            .select(Database.raw(`json_build_object('door_no', door_no,'street',street,'landmark',landmark,'city',city,'pincode',pincode) as address`))
            .join('custs', 'custs.customer_id', '=', 'hoteldatabases.customer_id')
            .orderBy('hoteldatabases.id')
            .then(data => data.map(
                element => {

                    const data = element.toJSON()

                    return {

                        ...data,
                        customer_name: element.$extras.customer_name,
                        address: element.$extras.address

                    }
                }))

        return {
            data
        }
    }

    public async insertData({ request }: HttpContext) {

        const dataInsert = new Hoteldatabase()

        const payLoad = await request.validate(HotelValidator)

        dataInsert.id = payLoad['id']

        dataInsert.customer_id = payLoad['customer_id']

        dataInsert.hotel_name = payLoad['hotel_name']

        dataInsert.door_no = payLoad['doorno']

        dataInsert.street = payLoad['street']

        dataInsert.landmark = payLoad['landmark']

        dataInsert.city = payLoad['city']

        dataInsert.pincode = payLoad['pincode']

        await dataInsert.save()

        return dataInsert
    }

    public async editData({ request }) {

        const payLoad = await request.validate(HotelValidator)

        const editInsert = await Hoteldatabase.findOrFail(request.param('id'))

        editInsert.customer_id = payLoad['customer_id']

        editInsert.hotel_name = payLoad['hotel_name']

        editInsert.door_no = payLoad['doorno']

        editInsert.street = payLoad['street']

        editInsert.landmark = payLoad['landmark']

        editInsert.city = payLoad['city']

        editInsert.pincode = payLoad['pincode']

        await editInsert.save()

        return editInsert
    }

    public async deleteData({ request }) {

        const deleteItem = await Hoteldatabase.findOrFail(request.param('id'))

        deleteItem.delete()

        await deleteItem.save()
    }

    public async searchQuery({ request }: HttpContext) {

        const data = request.input('term')

        const regx: RegExp = /^[0-9]/

        const searchData = await Hoteldatabase.query()

            .select('hoteldatabases.*')
            .select('custs.customer_name as customer_name')
            .select(Database.raw(`json_build_object('door_no', door_no,'street',street,'landmark',landmark,'city',city,'pincode',pincode) as address`))
            .leftJoin('custs', 'custs.customer_id', 'hoteldatabases.customer_id')
            .orderBy('hoteldatabases.id')
            .where((query) => {

                if (regx.test(data) == true) {

                    query
                        .where('hoteldatabases.id', data)
                        .orWhere('hoteldatabases.customer_id', data)
                        .orWhere('pincode', data)
                }
                else {
                    query
                        .where("hoteldatabases.hotel_name", "ilike", `%${data}%`)
                        .orWhere("custs.customer_name", "ilike", `%${data}%`)
                }
            })
            .then(data => data.map(el => {

                const data = el.toJSON()

                return {

                    ...data,
                    customer_name: el.$extras.customer_name,
                    address: el.$extras.address

                }
            }))

        return searchData
    }

    public async sortAscending({ request }: HttpContext) {

        const columnName = request.input('columnName')

        let sortData = await Hoteldatabase.query()

            .select('hoteldatabases.*')
            .select('custs.customer_name as customer_name')
            .select(Database.raw(`json_build_object('door_no', door_no,'street',street,'landmark',landmark,'city',city,'pincode',pincode) as address`))
            .join('custs', 'hoteldatabases.customer_id', '=', 'custs.customer_id')
            .orderBy(`${columnName}`, `asc`)
            .then(data => data.map(el => {
                const data = el.toJSON()
                return {

                    ...data,
                    customer_name: el.$extras.customer_name,
                    address: el.$extras.address

                }
            }))

        return sortData
    }

    public async sortDescending({ request }: HttpContext) {
        
        const columnName = request.input('columnName')

        let sortData = await Hoteldatabase.query()

            .select('hoteldatabases.*')
            .select('custs.customer_name as customer_name')
            .select(Database.raw(`json_build_object('door_no', door_no,'street',street,'landmark',landmark,'city',city,'pincode',pincode) as address`))
            .join('custs', 'hoteldatabases.customer_id', '=', 'custs.customer_id')
            .orderBy(`${columnName}`, `desc`)
            .then(data => data.map(el => {
                const data = el.toJSON()
                return {

                    ...data,
                    customer_name: el.$extras.customer_name,
                    address: el.$extras.address

                }
            }))

        return sortData
    }

}
