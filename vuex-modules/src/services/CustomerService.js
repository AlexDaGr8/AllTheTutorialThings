import api from '../utils/api';

export default {
    postCustomer (customer) {
        console.log('customer', customer.data)
        const address = {
            street: customer.data.address.street,
            town: customer.data.address.town,
            zip: customer.data.address.zip
        };
        const name = {
            firstName: customer.data.name.firstName,
            lastName: customer.data.name.lastName
        }
        const props = {
            address: address,
            name: name
        }
        return api().post('customer', customer.data);
    },
    getCustomers() {
        return api().get(`getAllCustomers`)
    },
    getCustomer(id) {
        return api().get(`getCustomer/${id}`)
    }
}