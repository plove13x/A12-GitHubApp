function renderTemplate(templateId, container, finalArgument) {
    var templateString = $('#' + templateId).text();
    var templateFunction = _.template(templateString);
    var renderedTemplate = templateFunction(finalArgument);
    $(container).append(renderedTemplate);
};

/* UNNECESSARY BUT MAY BE WORKING
var defaultIssue = {
	title: "<Untitled>",
	created_at: new Date(0)		
};
*/

var serverUrl = "https://api.github.com/issues";

$.getJSON(serverUrl).done(function(issues) {
    console.log(issues);
    var sortedIssueArray = _.sortBy(issues, function(i) {
        return Date.parse(i.created_at);
    });
    _.each(sortedIssueArray, function(issue) {
        /*_.defaults(issue, defaultIssue);*/
        renderTemplate('listTemplateScript', '.issueList', issue);
    });
});



$(document).on('click', ".clickableList", function(loaded) {

    var commentsUrl = $(this).attr("data-id");
    $.ajax(commentsUrl, {           
        type: "GET",
        dataType: "json"
    }).done(function(comments) {
        $(".existingComments").html("");
        $( ".existingComments" ).append( "<h2>Issue Title</h2><h3>Comments</h3>" );
       _.each(comments, function(comment) {
            renderTemplate('issueTemplateScript', '.existingComments', comment);
       });
    });    
    loaded.preventDefault();
});



setInterval(function() {
    $.ajax(serverUrl).done(function(issues) {
        var sortedIssueArray = _.sortBy(issues, function(i) {
            return Date.parse(i.created_at);
        });
        $(".issueList").html("");
        _.each(sortedIssueArray, function(issue) {
            /*_.defaults(issue, defaultIssue);*/
            renderTemplate('listTemplateScript', '.issueList', issue);
        });
    });
}, 30000);



/* comments_url: https://api.github.com/repos/TIY-GVL-FEE-2014-Aug/Assignments/issues/153/comments */