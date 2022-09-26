import { HttpContext } from "@adonisjs/core/build/standalone";
import Cust from "App/Models/Cust";
import CustomerValidator from "App/Validators/CustomerValidator";


export default class CustsController {


    public async displayData({ }: HttpContext) {

        const user = await Cust.query()
            .leftJoin('hoteldatabases', 'custs.customer_id', 'hoteldatabases.customer_id')
            .select('custs.*')
            .count('hoteldatabases.customer_id as count')
            .groupBy('custs.id', 'custs.customer_id', 'custs.customer_name', 'hoteldatabases.customer_id')
            .orderBy('custs.id')

        const newDataWithCount = user.map(

            (el) => Object.assign(

                {}, el.$attributes, {

                count: el.$extras.count

            }
            )
        )

        return {

            data: newDataWithCount

        }
    }

    public async inserData({ request, response }: HttpContext) {

        const payLoad = await request.validate(CustomerValidator)

        const dataInsert = new Cust();

        dataInsert.id = payLoad['id'];

        dataInsert.customer_id = payLoad['customer_id'];

        dataInsert.customer_name = payLoad['customer_name'];

        await dataInsert.save();

        return response.json({ dataInsert });

    }

    public async editData({ request }: HttpContext) {

        const payLoad = await request.validate(CustomerValidator)

        const editInsert = await Cust.findOrFail(request.param('id'))

        editInsert.customer_id = payLoad['customer_id']

        editInsert.customer_name = payLoad['customer_name']

        await editInsert.save()

        return editInsert
    }

    public async deleteData({ request }: HttpContext) {

        const deleteItem = await Cust.findOrFail(request.param('id'))

        await deleteItem.delete()

        await deleteItem.save()

        return deleteItem
    }

    public async searchQuery({ request }: HttpContext) {

        const data = request.input('term')

        const searchData = await Cust.query()

            .leftJoin('hoteldatabases', 'custs.customer_id', 'hoteldatabases.customer_id')
            .select('custs.*')
            .count('hoteldatabases.customer_id as count')
            .groupBy('custs.id', 'custs.customer_id', 'custs.customer_name', 'hoteldatabases.customer_id')
            .orderBy('custs.id')

            .where((query) => {

                if (/^[0-9]/.test(data)) {

                    query
                        .where('custs.id', data)
                        .orWhere('custs.customer_id', data)

                }

            })

            .orWhere((query: any) => {

                query
                    .where("custs.customer_name", "ilike", `%${data}%`)

            })

        const newSearchData = searchData.map(

            (el) => Object.assign(

                {}, el.$attributes, {

                count: el.$extras.count

            }
            )
        )

        return {
            newSearchData
        }
    }

    public async sortAscending({ request }: HttpContext) {

        const columnName = request.input('columnName')

        const sort = await Cust.query()
            .leftJoin('hoteldatabases', 'custs.customer_id', 'hoteldatabases.customer_id')
            .select('custs.*')
            .count('hoteldatabases.customer_id as count')
            .groupBy('custs.id', 'custs.customer_id', 'custs.customer_name', 'hoteldatabases.customer_id')
            .orderBy(`${columnName}`, `asc`)

        const newSort = sort.map(

            (el) => Object.assign(

                {}, el.$attributes, {

                count: el.$extras.count

            }
            )
        )

        return {

            sort: newSort

        }
    }

    public async sortDescending({ request }: HttpContext) {

        const columnName = request.input('columnName')

        const sort = await Cust.query()
            .leftJoin('hoteldatabases', 'custs.customer_id', 'hoteldatabases.customer_id')
            .select('custs.*')
            .count('hoteldatabases.customer_id as count')
            .groupBy('custs.id', 'custs.customer_id', 'custs.customer_name', 'hoteldatabases.customer_id')
            .orderBy(`${columnName}`, `desc`)

        const newSort = sort.map(

            (el) => Object.assign(

                {}, el.$attributes, {

                count: el.$extras.count

            }
            )
        )

        return {

            sort: newSort

        }
    }
}
