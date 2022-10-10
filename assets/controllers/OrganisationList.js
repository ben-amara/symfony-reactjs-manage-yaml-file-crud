// ./assets/js/components/Users.js

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import OrganizationForm from './organization-form';
import config from '../config/config'

const initialFormDt = {
    name: '',
    description: '',
    users: []
}
const initialFormError = {
    name: '',
    description: '',
    users: []
}
export const OrganisationList = () => {

    const [state, setState] = useState({ organisations: [], loading: true });
    const [switcherForm, setSwitcherForm] = useState('LIST');
    const [indexOrg, setIndexOrg] = useState(null);
    const [frmData, setFrmData] = useState(initialFormDt);

    const initApp = () => {
        setSwitcherForm('LIST')
        setIndexOrg(null)
        setFrmData(initialFormDt)
        console.log(indexOrg)
    }

    const getData = useCallback(async () => {
        try {
            let resp = await axios.get(config.API_BACKEND);
            setState({ organisations: resp.data.organizations, loading: false });
        } catch (err) {
            console.error(err);
        }
        //Note in the line below 
    }, []);

    useEffect(() => {
        getData()
    }, [getData])

    const handlerDelete = (name, index) => {
        axios.delete(`${config.API_BACKEND}/${name}/delete`).then(resp => {
            const copyState = state.organisations.filter((row, i) => i !== index);
            setState({ organisations: copyState, loading: false });
            console.log(state)
        }).catch(err => console.log(err))
    }

    const handlerOnChange = e => {
        const { name, value } = e.target;
        const _check_split = name.split('_')
        if (_check_split.length > 1) { //users side
            const copyUsers = frmData
            copyUsers.users[_check_split[2]][_check_split[1]] = value
            setFrmData({ ...copyUsers })
        } else {
            setFrmData({
                ...frmData, [name]: value
            })
        }
    }

    const hadnlerSwitchForm = (action, item, index) => {
        setSwitcherForm(action)
        switch (action) {
            case 'UPDATE':
                setFrmData(item);
                setIndexOrg(index)
                break;
            case 'ADDED':
                setIndexOrg(null)
                initialFormDt.users = []
                setFrmData(initialFormDt)
                break;
            default:
                initApp();
                break;
        }
    }

    const handlerBack = (action) => {
        setSwitcherForm(action)
        initApp()
    }

    const handlerAddUser = () => {
        const user = { name: '', password: '', role: [] }
        const copyUser = frmData;
        copyUser.users.push(user)
        setFrmData({ ...copyUser })
    }

    const handlerRemoveUser = (index) => {
        const copyUser = frmData.users;
        copyUser.splice(index, 1);
        setFrmData({ ...frmData, ...copyUser })
    }

    const handlerOnSubmit = async e => {
        e.preventDefault();
        console.log('Form submit request', frmData)
        if (indexOrg == null) {
            callAddOrg(frmData)
        } else {
            callUpdateOrg(frmData, indexOrg)
        }

        initApp();

    }

    const callAddOrg = (item) => {
        axios.post(`${config.API_BACKEND}/new`, item).then(resp => {
            getData()
        }).catch(err => console.log(err))
    }

    const callUpdateOrg = (item, index) => {
        axios.put(`${config.API_BACKEND}/${index}`, item).then(resp => {
            getData()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <section className="row-section">

                {(switcherForm === 'LIST') ? <div className="container">
                    <div className="row">
                        <h2 className="text-center"><span>List of organisations</span></h2>
                    </div>
                    <div className="row text-right">
                        <div className='col-12'>
                            <button type="button" onClick={() => hadnlerSwitchForm('ADDED')} className="btn btn-primary mb-2"><i className="fas fa-plus"></i></button>
                        </div>

                    </div>
                    {state.loading ? (
                        <div className={'row text-center'}>
                            <span className="fa fa-spin fa-spinner fa-4x"></span>
                        </div>
                    ) : (
                        <div className='row'>

                            <div className="">
                                <div className="container">
                                    <div className="row">
                                        <div className="">
                                            <table className="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">description</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.organisations.map((row, index) =>
                                                        <tr key={index}>
                                                            <th scope="row">{index}</th>
                                                            <td>{row.name}</td>
                                                            <td>{row.description}</td>
                                                            <td className='col-2'>
                                                                <button type="button" onClick={() => hadnlerSwitchForm('UPDATE', row, index)} className="mr-2 btn btn-success"><i className="fas fa-edit"></i></button>
                                                                <button type="button" onClick={() => handlerDelete(row.name, index)} className="btn btn-danger"><i className="far fa-trash-alt"></i></button>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                </div> : (
                    <div className="container">
                        <OrganizationForm
                            handlerBack={handlerBack}
                            handlerOnChange={handlerOnChange}
                            handlerAddUser={handlerAddUser}
                            handlerOnSubmit={handlerOnSubmit}
                            handlerRemoveUser={handlerRemoveUser}
                            switcherForm={switcherForm}
                            frmData={frmData}
                        />
                    </div>
                )

                }
            </section>
        </div>
    )
}
