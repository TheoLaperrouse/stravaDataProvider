import Bree from 'bree';
import Graceful from '@ladjs/graceful';

console.log('Launch strava-data-provider...');

const bree = new Bree({
    jobs: [
        {
            name: 'strava-activities',
            interval: 'every 1 min',
        },
    ],
});

const graceful = new Graceful({ brees: [bree] });
graceful.listen();

(async () => {
    await bree.start();
})();
