const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {runCommand} = require('./utils');

app.get('/', async (req, res) => {
    try {
        const NAMESPACE = `default`;
        const getToken = `TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)`;
        const makeCall = `curl https://kubernetes.${NAMESPACE}.svc/api/v1/namespaces/default/endpoints --silent  --header "Authorization: Bearer $TOKEN" --insecure`;
        const jqQuery = `jq -rM ' .items[] | select( .metadata.name | contains("planet9-sidecar-poc") )'`;
        const command = `${getToken}; ${makeCall} | ${jqQuery}`;
        const result = await runCommand(command);
        res.send(result);
    } catch (error) {
        res.send('FAILED: ' + error.toString());
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
