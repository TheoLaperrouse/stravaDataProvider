import moment from 'moment';
import strava from 'strava-v3';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

(async () => {
    const start = moment().subtract(1, 'days').format(DATE_FORMAT);
    const end = moment().format(DATE_FORMAT);

    strava.config({ access_token: process.env.STRAVA_ACCESS_TOKEN });
    const activities = await strava.athlete.listActivities({
        id: 70861920,
        after: moment().subtract(1, 'months').unix(),
    });
    const points = activities
        .map((activity) => [
            {
                name: 'distance_run',
                value: activity.distance / 1000,
                date: activity.start_date_local,
            },
            {
                name: 'time_run',
                value: activity.moving_time,
                date: activity.start_date_local,
            },
            {
                name: 'speed_run',
                value: (activity.distance / activity.moving_time) * 3.6,
                date: activity.start_date_local,
            },
        ])
        .flat();

    console.log(points);
    console.log(`Starting import from ${start} to ${end}`);
})();
