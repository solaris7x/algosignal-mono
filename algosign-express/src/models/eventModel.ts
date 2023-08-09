export interface EventModel {
    _id: string;
    title: string;
    author: string;
    date: Date;
    body: string;
}

const Events: EventModel[] = [];
export default Events;
