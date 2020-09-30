const payload = {
    service: 'com.alipay.nodejs.HelloService:1.0',
    methodName: 'plus',
    args: [ 1, 2 ],
  };

  const body = new Buffer(JSON.stringify(payload));

  console.log(body)