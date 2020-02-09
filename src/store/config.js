import { createStore } from 'redux';

import updateQuota from './reducer/quotaReducer';

export default createStore(updateQuota);   