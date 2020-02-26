import PubSub from 'pubsub-js';

export default class DialogService {

    static get dialog() {
        return PubSub;
    }
        
    static open(id) {
        PubSub.publish(id, true);
    }
    
    static close(id) {
        PubSub.publish(id, false);
    }

}