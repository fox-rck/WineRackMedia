<%@ Control Language="C#" AutoEventWireup="false" Inherits="iFinity.DNN.Modules.UrlMaster.UI.Controls.UrlOptions" %>
<%@ Register TagPrefix="dnn" TagName="Label" Src="~/controls/LabelControl.ascx" %>
<%@ Register TagPrefix="ifty" TagName="TabSingleSelect" Src="TabSingleSelect.ascx" %>
<%@ Register TagPrefix="ifty" TagName="SaveMessage" Src="SaveMessage.ascx" %>
<%@ Register TagPrefix ="ifty" TagName="PropertySource" Src="PropertySource.ascx" %>
<div id="urlSettings" class="normal" style="text-align:left;">
<div>
    <asp:Label ID="lblOverview" runat="server" />
</div>
<asp:Label ID="lblLicenceDetail" runat="server" CssClass="licenceDetail" />
<div id="tabs" class="dnnForm">
    <ul class="dnnAdminTabNav dnnClear">
        <li class="first"><a href="#friendlyUrlSettingsTab"><asp:Label ID="lblFriendlyUrlSettingsTabHdr" runat="server" /></a></li>
        <li><a href="#advancedSettingsTab"><asp:Label ID="lblAdvancedSettingsTabHdr" runat='server' /></a></li>
        <li><a href="#regexSettingsTab"><asp:Label ID="lblRegexSettingsTabHdr" runat='server' /></a></li>
        <li><a href="#performanceSettingsTab"><asp:Label ID="lblPerformanceSettingsTabHdr" runat='server' /></a></li>
        <li><a href="#testUrlsTab"><asp:Label ID="lblTestUrlsTabHdr" runat='server' /></a></li>
    </ul>
    <div id="friendlyUrlSettingsTab">
        <asp:Panel ID="urlMaster_FriendlyUrlSettings" runat="server" CssClass="friendlyUrlSettingsCont">
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblReplaceSpaces" runat="server" EnableViewState="false" ResourceKey="ReplaceSpaces" CssClass="Normal"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkReplaceSpaces" runat="server" CssClass="Normal"/><asp:TextBox ID="txtReplaceSpaceWith" runat="server" CssClass="Normal" Width="20px"/> 
                    <ifty:PropertySource id="ctlReplaceSpaces" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="fieldOption">
                <span class="fieldLabelFull">
                    <dnn:Label ID="lblPageExtensionUsage" runat="server"  EnableViewState="false" ResourceKey="PageExtensionUsage"/>
                </span>
                <span class="fieldValueWide">
                    <asp:RadioButtonList ID="optPageExtensionUsage" runat="server" CssClass="Normal" >
                        <asp:ListItem Text="Always Use Page Extension" Value="Always" />
                        <asp:ListItem Text="Never Use Page Extension" Value="Never"/>
                        <asp:ListItem Text="Only for Pages" Value="PageOnly"  />
                    </asp:RadioButtonList> 
                    <ifty:PropertySource id="ctlPageExtensionUsage" runat="server" CssClass="propertySourceOpt"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="fieldOption" id="pageExtension">
                <span class="fieldLabel">
                    <dnn:Label ID="lblPageExtension" runat="server" EnableViewState="false" ResourceKey="PageExtension"/>
                </span>
                <span class="fieldValue">
                    <asp:TextBox ID="txtPageExtension" runat="server" CssClass="Normal"/>
                    <ifty:PropertySource id="ctlPageExtension" runat="server" CssClass="propertySourceTb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblRedirectUnfriendly" runat="server" EnableViewState="false" ResourceKey="RedirectUnfriendly"/>
                </span>
                <span class="fieldValue">
                    <asp:Checkbox ID="chkRedirectUnfriendly" runat="server" CssClass="Normal" />
                    <ifty:PropertySource id="ctlRedirectUnfriendly" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>  
            <div class="fieldOption">
                <span class="fieldLabelFull">
                    <dnn:Label ID="lblCurrentProviderHdr" runat="server" EnableViewState="false" ResourceKey="CurrentProvider"/>
                </span>
                <span class="fieldValueWide">
                    <asp:Label id="lblCurrentProvider" runat="server" CssClass="currentProvider"/>               
                </span>
                <div class="fieldOptionFtr"></div>
            </div>  
        </asp:Panel>
    </div>
    <div id="advancedSettingsTab">
        <asp:Panel ID="urlMaster_AdvancedSettings" runat="server">
            <div class="fieldOption" >
                <span class="fieldLabel">
                    <dnn:Label ID="lblForceLowerCase" runat="server" EnableViewState="false" ResourceKey="ForceLowerCase"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkForceLowerCase" runat="server" CssClass="Normal"/>
                    <ifty:PropertySource id="ctlForceLowerCase" runat="server" CssClass="propertySourceCb" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblRedirectWrongCase" runat="server" EnableViewState="false" ResourceKey="RedirectWrongCase"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox id="chkRedirectWrongCase" runat="server" CssClass="Normal" />
                    <ifty:PropertySource id="ctlRedirectWrongCase" runat="server" CssClass="propertySourceCb" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabelFull">
                    <dnn:Label id="lblSpaceEncodingValue" runat="server" EnableViewState="false" ResourceKey="SpaceEncodingValue"/>
                </span>
                <span class="fieldValueWide">
                    <asp:RadioButtonList ID="optSpaceEncoding" runat="server"  CssClass="Normal">
                        <asp:ListItem Value="%20" />
                        <asp:ListItem Value="+" />
                    </asp:RadioButtonList>
                    <ifty:PropertySource id="ctlSpaceEncoding" runat="server" CssClass="propertySourceOpt"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblAutoAsciiConversion" runat="server"  EnableViewState="false" ResourceKey="AutoAsciiConversion"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkAutoAsciiConvert" runat="server" />
                    <ifty:PropertySource id="ctlAutoAsciiConvert" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblCheckForDupUrls" runat="server" EnableViewState="false" ResourceKey="CheckForDupUrls"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkForDupUrls" runat="server" />
                    <ifty:PropertySource id="ctlCheckForDupUrls" runat="server" CssClass="propertySourceCb" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblRedirectDefaultPage" runat="server" EnableViewState="false" ResourceKey="RedirectDefaultPage"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox id="chkRedirectDefaultPage" runat="server" />
                    <div id="defaultRedirectConfirm" runat="server" visible="false" class="confirmMessage">
                        <asp:Image ID="imgDefaultRedirectConfirm" runat="server" CssClass="Normal" Visible="False"/>
                        <asp:Label ID="lblDefaultRedirectConfirm" runat="server" CssClass="Normal" Visible="False"/>
                        <div class="confirmButton">
                            <button id="btnDefaultRedirectConfirm" runat="server"  />
                        </div>
                    </div>
                    <ifty:PropertySource id="ctlRedirectDefaultPage" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblClientSslRedirect" runat="server" EnableViewState="false" ResourceKey="ClientSslRedirect"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkClientSSLRedirect" runat="server" CssClass="Normal"/>
                    <ifty:PropertySource id="ctlClientSSLRedirect" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblRebaseClientUrl" runat="server" EnableViewState="false" ResourceKey="RebaseClientUrl"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkRebaseClientUrl" runat="server" CssClass="Normal"/>
                    <ifty:PropertySource id="ctlRebaseClientUrl" runat="server"  CssClass="propertySource"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption" >
                <span class="fieldLabel">
                    <dnn:Label ID="lblForcePortalDefaultLanguage" runat="server" EnableViewState="false" ResourceKey="ForcePortalDefaultLanguage"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkForcePortalDefaultLanguage" runat="server"/>
                    <ifty:PropertySource id="ctlForcePortalDefaultLanguage" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption" >
                <span class="fieldLabel">
                    <dnn:Label ID="lblFriendlyAdminHostUrls" runat="server" EnableViewState="false" ResourceKey="FriendlyAdminHostUrls"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkFriendlyAdminHostUrls" runat="server"/>
                    <ifty:PropertySource id="ctlFriendlyAdminHostUrls" runat="server" CssClass="propertySourceCb"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>             
            
            <div class="fieldOption">
                <span class="fieldLabelFull">
                    <dnn:Label ID="lblDeletedTabHandling" runat="server" EnableViewState="false" ResourceKey="DeletedTabHandling"/>
                </span>
                <span class="fieldValueWide">
                    <asp:RadioButtonList ID="optDeletedTabHandling" runat="server" CssClass="Normal" >
                        <asp:ListItem Value="Do301RedirectToPortalHome" />
                        <asp:ListItem Value="Do404Error" />
                    </asp:RadioButtonList> 
                    <ifty:PropertySource id="ctlDeletedTabHandling" runat="server"  class="Floater"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>             
            <div class="fieldOption">
                <span class="fieldLabelFull">
                    <dnn:Label ID="lblForwardExternalUrls" runat="server" EnableViewState="false" CssClass="Normal" ResourceKey="ForwardExternalUrls"/>
                </span>
                <span class="fieldValueWide">
                    <asp:RadioButtonList ID="optForwardExternalUrls" runat="server" CssClass ="Normal" >
                        <asp:ListItem Selected="true" Value="Redirect301"/>
                        <asp:ListItem Selected ="false" Value="NoForward" />
                        <asp:ListItem Selected="false" Value="Redirect302"/>
                    </asp:RadioButtonList>
                    <ifty:PropertySource id="ctlForwardExternalUrls" runat="server" CssClass="propertySourceOpt" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label ID="lblPageListSize" runat="server" EnableViewState="false" ResourceKey="PageListSize"/>
                </span>
                <span class="fieldValue">
                    <asp:TextBox ID="txtPageListSize" runat="server" CssClass="Normal" />
                    <ifty:PropertySource id="ctlPageListSize" runat="server" CssClass="propertySource"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>         

        </asp:Panel>
    </div>
    <div id="regexSettingsTab">
    <asp:Panel ID="urlMaster_RegexSettings" runat="server">
        <div class="fieldOption">
			<dnn:Label ID="lblRegexSettingsHdr" runat="server" EnableViewState="false" ResourceKey="RegexSettings"/>
		</div>
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblIgnoreRegex" runat="server" EnableViewState="false" ResourceKey="IgnoreRegex"/>
            </span>
            <span class="fieldValueWide">
                <asp:TextBox ID="txtIgnoreRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlIgnoreRegex" runat="server" />
            </span>
            
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRewriteRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRewriteRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtDoNotRewriteRegex" runat="server" CssClass="regexTb"/> 
	            <ifty:PropertySource id="ctlDoNotRewriteRegex" runat="server" />    
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblUseSiteUrlsRegex" runat="server" EnableViewState="false" ResourceKey="UseSiteUrlsRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtUseSiteUrlsRegex" runat="server" CssClass="regexTb"/> 
                <ifty:PropertySource id="ctlUseSiteUrlsRegex" runat="server" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRedirectRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRedirectRegex"/>
    		</span>
	    	<span class="fieldValueWide">
            	<asp:TextBox ID="txtDoNotRedirectRegex" runat="server" CssClass="regexTb"/> 
                <ifty:PropertySource id="ctlDoNotRedirectRegex" runat="server" />
            </span>
            <div class="fieldOptionFtr"></div>
        </div>
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotRedirectSecureRegex" runat="server" EnableViewState="false" ResourceKey="DoNotRedirectSecureRegex"/>
		    </span>
		    <span class="fieldValueWide">
        	    <asp:TextBox ID="txtDoNotRedirectSecureRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlDoNotRedirectSecureRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblForceLowerCaseRegex" runat="server" EnableViewState="false" ResourceKey="ForceLowerCaseRegex"/>
		    </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtForceLowerCaseRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlForceLowerCaseRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
        	<span class="fieldLabelWide">
                <dnn:Label ID="lblNoFriendlyUrlRegex" runat="server" EnableViewState="false" ResourceKey="NoFriendlyUrlRegex"/>
		    </span>
		    <span class="fieldValueWide">
        	    <asp:TextBox ID="txtNoFriendlyUrlRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlNoFriendlyUrlRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
        	<span class="fieldLabelWide">
                <dnn:Label ID="lblDoNotIncludeInPathRegex" runat="server" EnableViewState="false" ResourceKey="DoNotIncludeInPathRegex" />
	        </span>
	        <span class="fieldValueWide">
                <asp:TextBox ID="txtDoNotIncludeInPathRegex" runat="server" CssClass="regexTb"/>
    		    <ifty:PropertySource id="ctlDoNotIncludeInPathRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>        
        <div class="fieldOption">
	        <span class="fieldLabelWide">
                <dnn:Label ID="lblTriggerDictionaryRebuildRegex" runat="server" EnableViewState="false" ResourceKey="TriggerDictionaryRebuildRegex"/>
	        </span>
		    <span class="fieldValueWide">
	            <asp:TextBox ID="txtTriggerDictionaryRebuildRegex" runat="server" CssClass="regexTb"/>
                <ifty:PropertySource id="ctlTriggerDictionaryRebuildRegex" runat="server" />
		    </span>
		    <div class="fieldOptionFtr"></div>
	    </div>                
    </asp:Panel>
    </div>    
    <div id="performanceSettingsTab">
        <asp:Panel ID="urlMaster_PerformanceSettings" runat="server">
            <div class="fieldOption" >
                <span class="fieldLabel">
                    <dnn:Label ID="lblAllowDebugCode" runat="server" EnableViewState="false" cssClass="Normal" ResourceKey="AllowDebugCode"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkAllowDebugCode" runat="server" CssClass="Normal" />
                    <ifty:PropertySource id="ctlAllowDebugCode" runat="server" />
                </span>
                <div class="fieldOptionFtr"></div>
            </div>  
            <div class="fieldOption" >
                <span class="fieldLabel">
                    <dnn:Label id="lblLogCacheMessages" runat="server" EnableViewState="false" ResourceKey="LogCacheMessages"/>   
                </span>
                <span class="fieldValue">
                    <asp:RadioButtonList ID="optCacheMessages" runat="server" CssClass ="Normal" RepeatDirection="Horizontal" >
                        <asp:ListItem Value="On"/>
                        <asp:ListItem Value="Off"/>
                    </asp:RadioButtonList>                    
                </span>
                <div class="fieldOptionFtr"></div>
            </div>     
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label id="lblUseCacheDependency" runat="server" EnableViewState="false" ResourceKey="UseCacheDependency"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkUseCacheDependency" runat="server" CssClass ="Normal"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div> 
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label id="lblPersistRestart" runat="server" EnableViewState="false" ResourceKey="PersistRestart"/>
                </span>
                <span class="fieldValue">
                    <asp:CheckBox ID="chkPersistRestart" runat="server" CssClass ="Normal"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div> 
            <div class="fieldOption">
                <span class="fieldLabel">
                    <dnn:Label id="lblCacheTime" runat="server" EnableViewState="false" ResourceKey="CacheTime"/>
                </span>
                <span class="fieldValue">
                    <asp:TextBox ID="txtCacheTime" runat="server" CssClass ="Normal" Width="50" MaxLength="5" />
                    <asp:DropDownList ID="ddlTimeUnits" runat="server"  CssClass ="Normal"/>
                </span>
                <div class="fieldOptionFtr"></div>
            </div>            
        </asp:Panel>
    </div>
    <div id="testUrlsTab">
        <asp:Panel ID="urlMaster_TestUrls" runat="server" CssClass="urlMaster_TestUrls">
        <asp:UpdatePanel id="updPanelTestUrls" runat="server">
        <ContentTemplate>
        <asp:UpdateProgress id="updProgressTestUrls" runat="server" DynamicLayout="true" AssociatedUpdatePanelID="updPanelTestUrls" Visible="true" >
            <ProgressTemplate>
                <div id="testWaiting">
                    <img id="imgProgress" runat="server" src="images/loading.gif" alt="Generating Test Urls..."/>
                </div>
            </ProgressTemplate>
        </asp:UpdateProgress>
        <div class="fieldOption">
            <span class="fieldValueWide">
                <dnn:Label id="lblSelectTestPage" runat="server" CssClass="Normal" ResourceKey="SelectTestPage" />
                <ifty:TabSingleSelect id="ctlTestPages" runat="server" CssClass="exampleTestPages" />
                <div class="testBox" >
                        <dnn:Label ID="lblExampleQueryString" runat="server" ResourceKey="ExampleQueryString"/>
                        <asp:TextBox ID="txtExampleQueryString" runat="server" width="95%"/><br />
                        <dnn:Label ID="lblExamplePageName" runat="server" ResourceKey="ExamplePageName"/>
                        <asp:TextBox ID="txtExamplePageName" runat="server" Width="95%" />
                        <asp:Button ID="btnSeeExample" runat="server" CssClass="Normal" CausesValidation="false"/>
                </div>
                <div class="testResult">
                    <dnn:Label ID="lblExampleResult" runat="server" ResourceKey="ExampleResult"/>
                    <asp:Repeater ID="rptFriendlyUrlExample" runat="server" >
                        <ItemTemplate>
                        <div class="friendlyUrlTestResults">
                            <asp:Label ID="lblFriendlyUrlExample" runat="server" EnableViewState="true" CssClass="friendlyUrlExample" Text=""/>
                            <br />
                            <a id="copyLink" runat="server" class="copyToTestRewrite" enableviewstate="true" />
                            <asp:Label ID="lblMessages" CssClass="friendlyUrlMessages" runat="server" EnableViewState="false"/>
                        </div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
                
            </span>
            <div class="fieldOptionFtr"></div>
        </div> 
        <div class="fieldOption">
            <div class="testRewriting">
                <div class="fieldValueWide">
                    <dnn:Label ID="lblTestRewriteHeader" runat="server" EnableViewState="false" ResourceKey="TestRewriteHeader" />
                    <dnn:Label ID="lblTestRewrite" runat="server" EnableViewState="false" ResourceKey="TestRewrite"/>
                    <div class="testRewriteBox">
                        <asp:TextBox ID="txtTestRewrite" runat="server" CssClass="exampleTb" Width="95%"/>
                        <asp:Button ID="btnTestRewrite" runat="server" CssClass="Normal" CausesValidation='false'/>
                    </div>
            
                    <span class="fieldLabel">
                        <dnn:Label ID="lblRewriteResultsLabel" runat="server" EnableViewState="false" ResourceKey="RewriteResults"/>
                    </span>
                    <span class="testResultValue">
						<asp:Label ID="lblRewriteResults" runat="server" EnableViewState="false" />
					</span>                    
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                        <dnn:Label ID="lblLanguageResultsCultureLabel" runat="server" EnableViewState="false" ResourceKey="LanguageCultureResults"/>
                    </span>
                    <span class="testResultValue">
                        <asp:Label ID="lblLanguageCultureResults" runat="server" EnableViewState="false" />
                    </span>
                    <div class="fieldOptionFtr"></div>                    
                    <span class="fieldLabel">
                        <dnn:Label ID="lblTabNameResultsLabel" runat="server" EnableViewState="false" ResourceKey="TabNameResults"/>
                    </span>
                    <span class="testResultValue">
                        <asp:Label ID="lblTabNameResults" runat="server" EnableViewState="false" />
                    </span>
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                        <dnn:Label ID="lblRedirectResultsLabel" runat="server" EnableViewState="false" ResourceKey="RedirectResults" />            
                    </span>
                    <span class="testResultValue">
                        <div class="testResultDetail">
                            <asp:Label ID="lblRedirectResults" runat="server" EnableViewState="false" CssClass="friendlyUrlMessages"/>
                            <br />
                            <asp:Label id="lblRedirectUrl" runat="server" EnableViewState="false" CssClass="friendlyUrlExample" />
                            <a id="copyLink" runat="server" class="copyToTestRewrite" enableviewstate="false" />
                        </div>
                    </span>
                    <div class="fieldOptionFtr"></div>
                    <span class="fieldLabel">
                           <dnn:Label ID="lblRewriteMessageLabel" runat="server" EnableViewState="false" ResourceKey="RewriteMessage"/>
                    </span>
                    <span class="testResultValue">
                        <div class="testResultDetail">
                            <asp:Label ID="lblRewriteMessage" runat="server" EnableViewState="false" CssClass="testResultMessages" />
                        </div> 
                    </span>
                    <div class="fieldOptionFtr"></div>
                </div>
            </div>
            <div class="fieldOptionFtr"></div>
        </div>
      </ContentTemplate>
    </asp:UpdatePanel>
    </asp:Panel>
    </div>
</div>
<div id="pageExtDialog" class="pageExtDialog" runat="server" >
    <asp:Label ID="lblPageExtensionWarning" runat="server" />
</div>
<div id="defaultRedirectDialog" class="defaultRedirectDialog" runat="server" >
    <asp:Label ID="lblDefaultRedirectWarning" runat="server" />
</div>

    <div class="apply fieldOption">
        <div id="applyWarning" >
            <dnn:Label ID="lblApply" runat="server" EnableViewState="false" CssClass="Normal" ResourceKey="ApplyWarning"/>
        </div>
        <asp:Button ID="btnApply" runat="server" EnableViewState="false" OnClick ="btnApply_Click" CssClass="Normal"/>
        <asp:Button id="btnRevert" runat="server" EnableViewState="false" OnClick="btnRevert_Click" CssClass="Normal"/>
        <asp:Button ID="btnRebuild" runat="server" EnableViewState="false" OnClick="btnRebuild_Click" CssClass="Normal" />
        <br />
        <ifty:SaveMessage id="ctlSaveMessage" runat="server" />
		<br /><br /><asp:Label ID="lblCompression" runat="server" CssClass="Normal" />
    </div>
    <div class="Links fieldOption">
        <br />
        <asp:HyperLink ID="hlPortalUrls" runat="server" CssClass="Normal" />
        
        <asp:HyperLink ID="hlinkLicenceUpload" runat="server" CssClass="Normal" />
        
        <asp:HyperLink ID="hlinkLicenceDetails" runat="server" CssClass="Normal" />
        
        <asp:HyperLink ID="hlinkUninstall" runat='server' CssClass="Normal" />
        <br /><br /><br />
        <asp:Label ID="lblVersion" runat="server" />
    </div>
</div>