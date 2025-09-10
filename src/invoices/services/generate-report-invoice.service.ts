import { Injectable, InternalServerErrorException } from "@nestjs/common";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { OrganizationRepository } from "../../organization/repositories/organization.repository";
import { getInvoiceDocDefinition } from "../../shared/templates/invoice-pdf.template";
import { getBase64FromUrl } from "../../shared/utils/getBase64FromUrl";
import { InvoiceEntity } from "../entities/invoice.entity";
import { GetInvoiceByIdService } from "./get-invoice-by-id.service";

// biome-ignore lint/suspicious/noExplicitAny: <>
(pdfMake as any).vfs = (pdfFonts as any).vfs;

@Injectable()
export class GenerateReportInvoiceService {
  constructor(
    private readonly getInvoiceByIdService: GetInvoiceByIdService,
    private readonly organizationRepository: OrganizationRepository
  ) {}

  async run(invoiceId: number): Promise<Buffer> {
    const invoice: InvoiceEntity =
      await this.getInvoiceByIdService.run(invoiceId);

    const organization = await this.organizationRepository.findOne({
      where: { id: 1 },
    });

    if (!organization) {
      throw new InternalServerErrorException("Organization data not found");
    }

    const logoUrl = organization?.logoUrl || "";
    const logoBase64 = logoUrl ? await getBase64FromUrl(logoUrl) : "";

    const docDefinition = getInvoiceDocDefinition(
      invoice,
      organization,
      logoBase64
    );

    return new Promise((resolve, reject) => {
      const pdfDoc = pdfMake.createPdf(docDefinition);
      pdfDoc.getBuffer((buffer: Buffer) => {
        resolve(buffer);
      });
    });
  }
}
