'use strict'


import {
    CYBS_AUTHENTICATION_TYPE,
    CYBS_RUN_ENVIROMENT,
    CYBS_MERCHANT_ID,
    CYBS_MERCHANT_KEY_ID,
    CYBS_MERCHANT_SECRET_KEY
} from '../../../../env/.env'


export default {
    // common parameters
    authenticationType: CYBS_AUTHENTICATION_TYPE,
    runEnvironment: CYBS_RUN_ENVIROMENT,
    merchantID: CYBS_MERCHANT_ID,

    // http_signature parameters
    merchantKeyId: CYBS_MERCHANT_KEY_ID,
    merchantsecretKey: CYBS_MERCHANT_SECRET_KEY,

    // jwt parameters
    keyAlias: 'testrest',
    keyPass: 'testrest',
    keyFileName: 'testrest',
    keysDirectory: 'Resource',

    //meta key parameters
    useMetaKey: false,
    portfolioID: '',

    // logging parameters
    logConfiguration: {
        enableLog: false,
        /*logFileName: '',
        logDirectory: '',
        logFileMaxSize: '5242880',
        loggingLevel: 'debug',
        enableMasking: true*/
    }
}
