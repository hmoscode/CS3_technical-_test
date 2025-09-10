import { Injectable, NotFoundException } from "@nestjs/common";
import { In } from "typeorm";
import { ArticleRepository } from "../../articles/repositories/article.repository";
import { InvoiceDetailDto } from "../dtos/invoice.dto";

@Injectable()
export class InvoiceDetailCalculatorService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async buildInvoiceDetails(details: InvoiceDetailDto[]) {
    const articleIds = details.map((d) => d.articleId);
    const articles = await this.articleRepository.find({
      where: {
        id: In(articleIds),
      },
    });

    let totalAmount = 0;

    const calculatedDetails = details.map((detail) => {
      const article = articles.find(
        (a) => Number(a.id) === Number(detail.articleId)
      );

      if (!article) {
        throw new NotFoundException(
          `Article with ID ${detail.articleId} not found`
        );
      }
      const unitPrice = article.price;
      let priceWithWholesale: number | null = null;
      let totalWholesale: number | null = null;
      let totalPrice: number;
      if (detail.quantity >= article.wholesaleNumber) {
        const discount = (article.wholesalePercentage / 100) * unitPrice;
        priceWithWholesale = unitPrice - discount;
        totalWholesale = priceWithWholesale * detail.quantity;
        totalPrice = totalWholesale;
        totalAmount += totalWholesale;
      } else {
        totalPrice = unitPrice * detail.quantity;
        totalAmount += totalPrice;
      }

      return {
        ...detail,
        unitPrice,
        totalPrice,
        priceWithWholesale,
      };
    });

    return {
      details: calculatedDetails,
      totalAmount,
    };
  }
}
