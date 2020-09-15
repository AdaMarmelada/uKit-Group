let requireComponent = require.context(
        './components/routes',
        true,
        /.*\.vue$/
    ),
    componentConfig,
    componentName,
    routerData = [],
    RouterComponents = {};

requireComponent.keys().forEach((fileName) => {
    componentConfig = requireComponent(fileName);

    if (!!componentConfig.default.name) {
        componentName = componentConfig.default.name;
    } else {
        componentName = "v-" + fileName
            .replace(/^.\//, '')
            .replace(/\//g, '-')
            .replace(/\.\w+$/, '');
    }

    RouterComponents[componentName] = componentConfig;

    if (!!componentConfig.default.routerData) {
        routerData.push(
            Object.assign(
                {component: componentConfig.default},
                componentConfig.default.routerData
            )
        );
    }
});

export {RouterComponents, routerData};
