<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="ucMyArticles.ascx.vb" Inherits="Ventrian.NewsArticles.ucMyArticles" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.UI.WebControls" Assembly="DotNetNuke" %>
<%@ Register TagPrefix="article" TagName="Header" Src="ucHeader.ascx" %>
<%@ Register TagPrefix="Ventrian" TagName="Listing" Src="Controls/Listing.ascx"%>
<article:header id=ucHeader1 SelectedMenu="myArticles" runat="server" MenuPosition="Top"></article:header>

<h2><asp:Label ID="lblMyArticles" runat="server" EnableViewState="false" ResourceKey="MyArticles" /></h2>
    
<asp:DropDownList ID="drpStatus" Runat="server" AutoPostBack="True" />
<asp:CheckBox ID="chkShowAll" runat="server" AutoPostBack="true" ResourceKey="ShowAll" CssClass="Normal" />
<br>
<asp:datagrid id=grdArticles runat="server" summary="Articles Design Table" EnableViewState="False" AutoGenerateColumns="false" cellspacing="2" CellPadding="2" Border="0" DataKeyField="ArticleID" GridLines="None" Width="100%">
	<Columns>
		<asp:TemplateColumn ItemStyle-Width="20">
			<ItemTemplate>
				<asp:HyperLink NavigateUrl='<%# GetEditUrl(DataBinder.Eval(Container.DataItem,"ArticleID").ToString) %>' Visible="<%# IsEditable %>" runat="server" ID="Hyperlink1">
				<asp:Image ImageUrl="~/images/edit.gif" AlternateText="Edit" Visible="<%# IsEditable %>" runat="server" ID="Hyperlink1Image" resourcekey="Edit"/></asp:HyperLink>
			</ItemTemplate>
		</asp:TemplateColumn>
		<asp:TemplateColumn ItemStyle-Width="125">
		    <HeaderStyle CssClass="NormalBold"  />
			<ItemStyle CssClass="Normal" />
			<HeaderTemplate>
			    <asp:Label ID="lblCreateDate" runat="server" ResourceKey="CreatedDate.Header" />
			</HeaderTemplate>
			<ItemTemplate>
			    <%#GetAdjustedCreateDate(Container.DataItem)%>
			</ItemTemplate>
		</asp:TemplateColumn>
		<asp:TemplateColumn ItemStyle-Width="125">
		    <HeaderStyle CssClass="NormalBold"  />
			<ItemStyle CssClass="Normal" />
			<HeaderTemplate>
			    <asp:Label ID="lblPublishDate" runat="server" ResourceKey="PublishDate.Header" />
			</HeaderTemplate>
			<ItemTemplate>
			    <%#GetAdjustedPublishDate(Container.DataItem)%>
			</ItemTemplate>
		</asp:TemplateColumn>
		<asp:TemplateColumn>
		    <HeaderStyle CssClass="NormalBold"  />
			<ItemStyle CssClass="Normal" />
			<HeaderTemplate>
			    <asp:Label ID="lblTitle" runat="server" ResourceKey="Title.Header" />
			</HeaderTemplate>
			<ItemTemplate>
			    <a href='<%# GetArticleLink(Container.DataItem) %>' target="_blank"><%#DataBinder.Eval(Container.DataItem, "Title")%></a>
			</ItemTemplate>
		</asp:TemplateColumn>
		<asp:BoundColumn HeaderText="AuthorFullName" DataField="AuthorFullName" ItemStyle-CssClass="Normal" HeaderStyle-Cssclass="NormalBold" ItemStyle-Wrap="False" HeaderStyle-Wrap="False" ItemStyle-Width="150" />
	</Columns>
</asp:datagrid>
<asp:label id=lblNoArticles Runat="server" CssClass="Normal" Visible="False"></asp:label>

<dnn:pagingcontrol id=ctlPagingControl runat="server"></dnn:pagingcontrol>

<article:header id=Header1 SelectedMenu="myArticles" runat="server" MenuPosition="Bottom"></article:header>
