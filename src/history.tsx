/**
 * separate history object for the router to use
 * browser router provided by react-router init's its own history object
 * however that history object is only accessible with hooks
 * https://github.com/ReactTraining/react-router
 */

 import { createBrowserHistory } from 'history';

 export default createBrowserHistory();
 