function Create_Menu_HTML() {
    var str = "";
    str += "<nav class=\"navbar navbar-expand-sm navbar-light\">";
    str += "<ul class=\"navbar-nav\">";

    str += "<li class=\"nav-item dropdown\">";
    str += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">Home</a>";
    str += "<div class=\"dropdown-menu\">";
    str += "<a class=\"dropdown-item\" href=\"content\\welcome.html\">Welcome</a>";
    str += "<a class=\"dropdown-item\" href=\"content\\about.html\">About</a>";
    str += "</div>";
    str += "</li>";

    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\gettingstarted.html\" >Getting Started</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\howdoi.html\" >How Do I...</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\git_commands.html\" >Git Commands</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\remote_actions.html\" >Remote Actions (TFS)</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\resources.html\" >Resources</a></li>";

    str += "<li class=\"nav-item dropdown\">";
    str += "<a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbardrop\" data-toggle=\"dropdown\">GitFlow</a>";
    str += "<div class=\"dropdown-menu\">";
    str += "<a class=\"dropdown-item\" href=\"content\\GitFlow.html\">Overview</a>";
    str += "<a class=\"dropdown-item\" href=\"content\\GitFlow\\GitFlow_commands.html\">Commands</a>";
    str += "<a class=\"dropdown-item\" href=\"content\\GitFlow\\GitFlow_visualworkflow.html\">Visual Workflow</a>";
    str += "</div>";
    str += "</li>";

    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\glossary.html\" >Glossary</a></li>";
    str += "<li class=\"nav-item\"><a class=\"nav-link\" href=\"content\\faq.html\" >FAQ</a></li>";
    str += "</ul>";
    str += "</nav>";
    return str;
}

function Create_CopyInTable_HTML() {
    var str = "";
    str += "<i class=\"copy_in_table fa fa-copy\" style=\"font-size:24px\" title=\"Copy command\"/>";
    return str;
}

function Create_CopyInCommand_HTML() {
    var str = "";
    str += "&nbsp;&nbsp;&nbsp;&nbsp;<i class=\"copy_in_command fa fa-copy\" style=\"font-size:24px\" title=\"Copy command\"/>";
    return str;
}

function Create_Glossary_HTML() {
    var str = "";
    str += "<a href=\"https://git.github.io/htmldocs/user-manual.html#def\" >display</a>";
    return str;
}

//******************************************************************************************
// UI Initializers
//******************************************************************************************


//******************************************************************************************
// Menus

function UIInitialize_BasePage() {
    UIInitialize_BasePageMenu();
    UIInitialize_CopyIcons();
    UIInitialize_Glossary();
}

function UIInitialize_SubFolderPage() {
    UIInitialize_SubFolderPageMenu();
    UIInitialize_CopyIcons();
    UIInitialize_Glossary();
}

function UIInitialize_BasePageMenu() {
    // https://flaviocopes.com/javascript-regular-expressions/#groups

    var replacedStr = Create_Menu_HTML();

    replacedStr = replacedStr.replace(/href=\"#\"/g, 'hrXef=\"#\"');
    replacedStr = replacedStr.replace(/href=\"/g, 'href=\"../');
    replacedStr = replacedStr.replace(/hrXef=\"#\"/g, 'href=\"#\"');

    $("#menu").html(replacedStr);

}

function UIInitialize_SubFolderPageMenu() {
    // https://flaviocopes.com/javascript-regular-expressions/#groups

    var replacedStr = Create_Menu_HTML();

    replacedStr = replacedStr.replace(/href=\"#\"/g, 'hrXef=\"#\"');
    replacedStr = replacedStr.replace(/href=\"/g, 'href=\"../../');
    replacedStr = replacedStr.replace(/hrXef=\"#\"/g, 'href=\"#\"');


    $("#menu").html(replacedStr);
}

// Menus
//******************************************************************************************


function UIInitialize_CopyIcons() {
    var str = Create_CopyInTable_HTML();
    $(".copy_in_table").html(str);

    str = Create_CopyInCommand_HTML();
    $(".copy_in_command").html(str);
}

function UIInitialize_Glossary() {
    //<span class = "glossary_def" title="def=def_fast_forward;display=fast-forward"> </span>
    //<a href="https://git.github.io/htmldocs/user-manual.html#def_fast_forward" >fast-forward</a>

    var strGlossary = Create_Glossary_HTML();
    $(".glossary_def").each(function () {
        var thisID = $(this);
        var title = thisID.attr("title");
        var def = title.split(";")[0].split("=")[1];
        var display = title.split(";")[1].split("=")[1];
        var str = strGlossary;
        str = str.replace("def", def);
        str = str.replace("display", display);
        thisID.html(str);
        thisID.removeAttr("title");
    });
}



//******************************************************************************************
// Event Handlers
//******************************************************************************************

function EventHandler_CopyClick() {
    $('.copy_in_table.fa-copy').click(function () {
        var thisID = $(this);
        var target = thisID[0].parentElement.parentElement.previousSibling;
        copyToClipboard(target);
    }
    );

    $('.copy_in_command.fa-copy').click(function () {
        var thisID = $(this);
        var target = thisID[0].parentElement.previousSibling;
        copyToClipboard(target);
    }
    );
}


function EventHandlers_Register() {

    EventHandler_CopyClick();
}


//https://stackoverflow.com/questions/22581345/click-button-copy-to-clipboard-using-jquery
function copyToClipboard(elem) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";

            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}
