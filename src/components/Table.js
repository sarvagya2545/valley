import React, { useState, useEffect } from 'react';

const Table = ({ data }) => {
    const [dataFields, setDataFields] = useState([]);
    
    useEffect(() => {
        // assume that data[0] has the same columns as all the other columns
        setDataFields(Object.keys(data[0] || {}));
    }, [data]);

    const createTableHead = () => {
        return dataFields.map((field,index) => {
            return (
                <th key={index}>
                    {field}
                </th>
            )
        })
    }

    const createTableBody = (data) => {
        return data.map((item, index) => {
            return (
                <tr key={index}>
                    {
                        dataFields.map((field, index) => (
                            <td key={index}>{item[field]}</td>
                        ))
                    }
                </tr>
            )
        })
    }

    const calculateTotal = (data) => {
        const reducer = (sum, item) => {
            return sum + item['Sales'];
        }
        return `${data.length ? data.reduce(reducer, 0) : 0}`
    }

    const calculatePercentage = (data) => {
        const reducer = (sum, item) => {
            return sum + parseInt(item['Percentage'].slice(0,-1));
        }
        return `${data.length ? data.reduce(reducer, 0) : 0}%`
    }

    return (
        <table>
            <thead>
                <tr>
                    {createTableHead(data)}
                </tr>
            </thead>
            <tbody>
                {createTableBody(data)}
                <tr>
                    <td>Total</td>
                    <td>{calculateTotal(data)}</td>
                    <td>{calculatePercentage(data)}</td>
                </tr>
            </tbody>
        </table>
    );
}
 
export default Table;