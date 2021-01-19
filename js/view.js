export default {
    render (templatename, data) {
        templatename = templatename + 'Template';

        const templateElement = document.getElementById(templateName);
        const templateSource = templateElement.innerHTML;
        const renderFn = Handlebars.compile(templateSource);

        return renderFn(data);
    }
};