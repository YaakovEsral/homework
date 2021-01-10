import React, { useState, useEffect } from 'react';
import api_key from './api_key';
import executeFetch from './fetch';
import Details from './Details';

export default function FullDetails() {

    const selectInput = document.getElementById('select-input');

    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState({});
    const [selectedCompanyRTInfo, setSelectedCompanyRTInfo] = useState({});
    const [error, setError] = useState(null);
    const defaultOptionText = companies.companies ? '--Select a company--' : 'Loading companies...';

    const companiesUrl = `https://api-v2.intrinio.com/companies?has_stock_prices=true&api_key=${api_key}`;
    const singleCompanyUrl = `https://api-v2.intrinio.com/companies/${selectedCompany}?api_key=${api_key}`

    useEffect(() => {
        (async () => {
            executeFetch(companiesUrl, setCompanies, setError);
        })();
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // console.log(selectedCompany);
        executeFetch(`https://api-v2.intrinio.com/companies/${selectedCompany}?api_key=${api_key}`, setSelectedCompanyInfo, setError)
        executeFetch(`https://api-v2.intrinio.com/securities/${selectedCompany}/prices/realtime?api_key=${api_key}`, setSelectedCompanyRTInfo, setError);
    }

    // console.log('companies', companies);
    const companiesOptions = companies.companies ? companies.companies.sort((a, b) => a.name < b.name ? -1 : 1).map
        (c => <option key={`${c.id}`} value={`${c.ticker}`}>{c.name}</option>) : [];
    companiesOptions.unshift(<option key={'index'} value={null}>{defaultOptionText}</option>);
    // console.log(companiesOptions);
    return (
        <div>
            <form onSubmit={handleFormSubmit} id="input-form">
                <select onChange={() => setSelectedCompany(selectInput.value)} id="select-input">
                    {companiesOptions}
                </select>
                <button>Update</button>
            </form>
            <Details info={selectedCompanyInfo} realtime={selectedCompanyRTInfo} error={error} />

        </div>
    )
}
