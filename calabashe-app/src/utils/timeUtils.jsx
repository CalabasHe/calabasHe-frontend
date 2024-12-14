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

export function generateFutureTimeIntervals(initial = '09:00', timeInterval = 30, end = '17:00', day) {
    const currentTimeString = format(day, 'HH:mm');
    const startTime = parse(initial, 'HH:mm', day);
    const endTime = parse(end, 'HH:mm', day);
    const intervals = [];
    console.log(currentTimeString)
    let currentTime = startTime;
    while (currentTime <= endTime) {
        const formattedTime = format(currentTime, 'HH:mm');
        
        // Only add times that are after the current time
        if (formattedTime > currentTimeString) {
            intervals.push(formattedTime);
        }
        
        currentTime = addMinutes(currentTime, timeInterval);
    }
    return intervals;
}