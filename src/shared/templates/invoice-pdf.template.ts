import { InvoiceEntity } from "../../invoices/entities/invoice.entity";
import { OrganizationEntity } from "../../organization/entities/organization.entity";

export function getInvoiceDocDefinition(
  invoice: InvoiceEntity,
  organization: OrganizationEntity,
  logoBase64: string
) {
  const detailsWithDiscount = (invoice.details ?? []).map((d, i) => {
    const unitPrice = d.unitPrice ?? 0;
    const quantity = d.quantity ? Number(d.quantity) : 0;
    const priceWithWholesale =
      d.priceWithWholesale !== undefined && d.priceWithWholesale !== null
        ? d.priceWithWholesale
        : null;

    const discount =
      priceWithWholesale !== null
        ? (unitPrice - priceWithWholesale) * quantity
        : 0;

    return {
      index: i + 1,
      name: d.article?.name || "",
      unitPrice: d.unitPrice,
      quantity: d.quantity,
      priceWithWholesale: d.priceWithWholesale,
      subtotal: d.totalAmount,
      discount: discount.toFixed(3),
    };
  });

  // Total descuentos
  const totalDiscounts = detailsWithDiscount
    .reduce((sum, d) => sum + parseFloat(d.discount), 0)
    .toFixed(3);

  return {
    content: [
      {
        columns: [
          {
            image: logoBase64,
            width: 100,
          },
          {
            stack: [
              { text: organization.name, style: "orgName" },
              { text: `NIT: ${organization.documentNumber}` },
              { text: organization.address },
              { text: `Tel: ${organization.phone}` },
              { text: organization.email },
            ],
          },
          {
            stack: [
              { text: "FACTURA DE VENTA", style: "header" },
              { text: `No: ${invoice.invoiceNumber}`, bold: true },
              {
                text: `Fecha: ${
                  invoice.createdAt
                    ? new Date(invoice.createdAt).toLocaleDateString()
                    : "N/A"
                }`,
              },
            ],
            alignment: "right",
          },
        ],
      },

      { text: " ", margin: [0, 20] },

      {
        text: "Datos del Cliente",
        style: "subheader",
        margin: [0, 0, 0, 8],
      },
      {
        table: {
          widths: ["auto", "*", "auto", "*"],
          body: [
            [
              "Nombre",
              invoice.customer?.name || "",
              "Documento",
              `${invoice.customer?.documentType ?? ""} ${
                invoice.customer?.documentNumber ?? ""
              }`,
            ],
            ["Dirección", invoice.customer?.address || "N/A", "", ""],
          ],
        },
        layout: "noBorders",
      },

      { text: " ", margin: [0, 20] },

      {
        text: "Detalle de Productos",
        style: "subheader",
        margin: [0, 0, 0, 8],
      },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "#", style: "tableHeader" },
              { text: "Artículo", style: "tableHeader" },
              { text: "P. Unitario", style: "tableHeader" },
              { text: "Cant.", style: "tableHeader" },
              { text: "P. Mayoreo", style: "tableHeader" },
              { text: "Descuento", style: "tableHeader" },
              { text: "Subtotal", style: "tableHeader" },
            ],
            ...detailsWithDiscount.map((d) => [
              d.index,
              d.name,
              { text: d.unitPrice, alignment: "right" },
              { text: `${d.quantity}`, alignment: "center" },
              d.priceWithWholesale
                ? { text: d.priceWithWholesale, alignment: "right" }
                : { text: "-", alignment: "center" },
              { text: d.discount, alignment: "right" },
              { text: d.subtotal, alignment: "right" },
            ]),
          ],
        },
        layout: "lightHorizontalLines",
      },

      { text: " ", margin: [0, 20] },

      {
        columns: [
          { text: "" },
          {
            table: {
              widths: ["*", "auto"],
              body: [
                [
                  "TOTAL DESCUENTOS",
                  {
                    text: totalDiscounts,
                    alignment: "right",
                  },
                ],
                [
                  "TOTAL",
                  {
                    text: `${invoice.totalAmount}`,
                    bold: true,
                    alignment: "right",
                  },
                ],
              ],
            },
            layout: "lightHorizontalLines",
            width: "40%",
            alignment: "right",
          },
        ],
      },
    ],

    styles: {
      header: {
        fontSize: 16,
        bold: true,
      },
      subheader: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 4],
      },
      tableHeader: {
        bold: true,
        fillColor: "#eeeeee",
        alignment: "center",
      },
      orgName: {
        fontSize: 14,
        bold: true,
      },
    },
    defaultStyle: {
      fontSize: 10,
    },
  };
}
