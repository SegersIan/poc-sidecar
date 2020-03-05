# Sidecar PoC

Check infrastructure/k8s.yml for the setup

* In the same pod as Planet9, we add a container called "sidecar"
* The sidecar container has the logic from the `sidecar/` folder
* If you ssh in the planet9 pod and run `localhost:3000` you get:
```json
{
  "metadata": {
    "name": "planet9-sidecar-poc",
    "namespace": "default",
    "selfLink": "/api/v1/namespaces/default/endpoints/planet9-sidecar-poc",
    "uid": "7177f9ad-5efa-11ea-a3a9-fe1d1feb4a4a",
    "resourceVersion": "6213428",
    "creationTimestamp": "2020-03-05T16:00:32Z"
  },
  "subsets": [
    {
      "addresses": [
        {
          "ip": "10.244.0.48",
          "nodeName": "aks-agentpool-49439107-vmss000001",
          "targetRef": {
            "kind": "Pod",
            "namespace": "default",
            "name": "planet9-sidecar-poc-89fc4c4df-5jfr2",
            "uid": "3c409e35-5f04-11ea-a3a9-fe1d1feb4a4a",
            "resourceVersion": "6213327"
          }
        },
        {
          "ip": "10.244.1.30",
          "nodeName": "aks-agentpool-49439107-vmss000002",
          "targetRef": {
            "kind": "Pod",
            "namespace": "default",
            "name": "planet9-sidecar-poc-89fc4c4df-l998h",
            "uid": "40d6592f-5f04-11ea-a3a9-fe1d1feb4a4a",
            "resourceVersion": "6213375"
          }
        },
        {
          "ip": "10.244.2.36",
          "nodeName": "aks-agentpool-49439107-vmss000000",
          "targetRef": {
            "kind": "Pod",
            "namespace": "default",
            "name": "planet9-sidecar-poc-89fc4c4df-cfggw",
            "uid": "44da8a29-5f04-11ea-a3a9-fe1d1feb4a4a",
            "resourceVersion": "6213418"
          }
        }
      ],
      "ports": [
        {
          "port": 80,
          "protocol": "TCP"
        }
      ]
    }
  ]
}
```
* These are all the IP addresses of all the pods which are running in the same replicaset/deployment/svc named `planet9-sidecar-poc`.
* It should be easy to filter out the own IP address. Now you can ping all other replica pods to singal a global script reload or such.
* You can also modify the sidecar that it does not return the IP addresses, but it just proxies any request to all the IP addresses except itself.