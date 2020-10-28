import React, { useState } from 'react'
import './styles.scss'
import BaseForm from '../../BaseForm';
import { MakeRequest } from '../../../../../core/utils/request';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string
}

type FormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });


    const handleOnChange = (event: FormEvent ) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...formData,
            imgUrl: 'https://i.zst.com.br/thumbs/45/21/15/1116423324.jpg',
            categories: [{ id: formData.category }]
        }

        MakeRequest({ url: '/products', method: 'POST', data: payload })
            .then(() => {
                setFormData({ name: '', price: '', category: '', description: '' })
            });

    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="cadastrar um produto">
                <div className="row">
                    <div className="col-6">
                        <input
                            name="name"
                            value={formData.name}
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do Produto"
                        />
                        <select name="category" value={formData.category} className="form-control mb-5" onChange={handleOnChange}>
                            <option value="1">Livros</option>
                            <option value="3">Computadores</option>
                            <option value="2">Eletronicos</option>
                        </select>

                        <input
                            name="price"
                            value={formData.price}
                            type="text"
                            className="form-control"
                            onChange={handleOnChange}
                            placeholder="Preço"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleOnChange}
                            className="form-control"
                            cols={30}
                            rows={10} />
                    </div>
                </div>


            </BaseForm>
        </form>
    )

}

export default Form;