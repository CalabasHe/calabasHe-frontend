import { format, parse , addMinutes} from "date-fns";
export function generateTimeIntervals(initial = '09:00', timeInterval = 30, end = '17:00') {
    const startTime = parse(initial, 'HH:mm', new Date());
    const endTime = parse(end, 'HH:mm', new Date());
    const intervals = [];

    let currentTime = startTime;
    while (currentTime <= endTime) {
        intervals.push(format(currentTime, 'HH:mm'));
        currentTime = addMinutes(currentTime, timeInterval);
    }

    return intervals;
}