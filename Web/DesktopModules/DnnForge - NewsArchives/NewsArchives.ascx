<%@ Control Language="vb" AutoEventWireup="false" CodeBehind="NewsArchives.ascx.vb" Inherits="Ventrian.NewsArticles.NewsArchives" %>
<asp:Repeater ID="rptNewsArchives" Runat="server" EnableViewState="False">
	<HeaderTemplate />
	<ItemTemplate />
	<FooterTemplate />
</asp:Repeater>
<asp:DataList ID="dlNewsArchives" Runat="server" EnableViewState="False" RepeatDirection="Horizontal" ItemStyle-VerticalAlign="Top">
	<HeaderTemplate />
	<ItemTemplate />
	<FooterTemplate />
</asp:DataList>
<asp:Label Runat="server" EnableViewState="False" ID="lblNotConfigured" ResourceKey="NotConfigured"
	Visible="False" CssClass="Normal" />
