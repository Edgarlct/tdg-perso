const assert = require('assert');
const {request} = require('gaxios');
const {exec} = require('child_process');
const waitPort = require('wait-port');

const startFF = async (target, signature, port) => {
    const ff = exec(
        `npx functions-framework --target=${target} --signature-type=${signature} --port=${port}`
    );
    await waitPort({host: 'localhost', port});
    return ff;
};

const httpInvocation = (fnUrl, port, query = null) => {
    const baseUrl = `http://localhost:${port}`;

    // GET request
    return request({
        url: `${baseUrl}/${fnUrl}`,
        params: query,
    });
};

describe('index.test', () => {
    describe('hotel get test', () => {
        const PORT = 8081;
        let ffProc;

        before(async () => {
            ffProc = await startFF('hotelGET', 'http', PORT);
        });

        after(() => ffProc.kill());

        it('hotel should return response 200 with status: OK', async () => {
            const response = await httpInvocation('hotelGET', PORT, { name: 'aaaaaaaaaaa' });

            assert.strictEqual(response.status, 200);
            assert.strictEqual(JSON.stringify(response.data), JSON.stringify({ hotel: 'aaaaaaaaaaa' }));
        });

        it('hotel should return response 404 with status: KO', async () => {
            try {
                await httpInvocation('hotelGET', PORT, { name: '404' });
            } catch (error) {
                assert.strictEqual(error.response.status, 404);
                assert.strictEqual(JSON.stringify(error.response.data), JSON.stringify({ message: 'Hotel not found' }));
            }
        });

        it('hotel should return response 400 with status: KO', async () => {
            try {
                await httpInvocation('hotelGET', PORT);
            } catch (error) {
                assert.strictEqual(error.response.status, 400);
                assert.strictEqual(JSON.stringify(error.response.data), JSON.stringify({ message: 'Missing name parameter' }));
            }
        });
    });
});
