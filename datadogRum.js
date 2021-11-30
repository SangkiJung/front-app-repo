import { datadogRum } from '@datadog/browser-rum';
    
datadogRum.init({
    applicationId: '6424fdde-818b-4c24-bfb9-c357e737e704',
    clientToken: 'pub7e1e8dd5d8cb110ba2c17866d390ce94',
    site: 'datadoghq.com',
    service:'demo-front-nginx',
    env:'eks-demo',
    version: '1.1.0',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input'
});
    
datadogRum.startSessionReplayRecording();