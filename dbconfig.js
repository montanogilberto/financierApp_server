const config = {
    user :'gmontano',
    password :'futbol_13',
    server:'financieraapp.database.windows.net',
    database:'FinancieraApp',
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'MSSQLSERVER'
    },
    port : 1433
}

module.exports = config;