import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Download, Info, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CTABanner } from "@/components/CTABanner";
import { QuoteDialog } from "@/components/QuoteDialog";
import { useProducts } from "@/lib/admin-data";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="min-h-[60vh] grid place-items-center px-6 py-20 text-center">
        <div>
          <h1 className="text-3xl font-light text-foreground">Product not found</h1>
          <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 hover:bg-brand-red-dark transition">
            <ArrowLeft className="h-4 w-4" /> Back to products
          </Link>
        </div>
      </section>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="py-10 md:py-16 bg-background">
        <div className="mx-auto max-w-[1920px] px-6 md:px-16">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" /> All products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            <div className="bg-muted border border-border overflow-hidden">
              <img
                src={product.image}
                alt={`${product.name} — ${product.brand}`}
                className="w-full h-auto object-cover"
              />
            </div>

            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{product.brand}</div>
              <h1 className="mt-2 text-3xl md:text-5xl font-light text-foreground leading-tight">{product.name}</h1>
              <div className="mt-3 text-sm text-primary">{product.category}</div>

              {product.featured && (
                <span className="inline-block mt-4 bg-primary text-primary-foreground text-xs px-3 py-1">Featured</span>
              )}

              <p className="mt-6 text-base text-muted-foreground leading-relaxed line-clamp-4">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <QuoteDialog
                  productName={product.name}
                  trigger={
                    <button type="button" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-normal hover:bg-brand-red-dark transition">
                      Get a quote <ArrowRight className="h-4 w-4" />
                    </button>
                  }
                />

                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className="inline-flex items-center gap-2 border border-border px-6 py-3 font-normal hover:border-primary hover:text-primary transition">
                      <Info className="h-4 w-4" /> View description
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-light">{product.name}</DialogTitle>
                    </DialogHeader>
                    <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {product.brand} · {product.category}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </DialogContent>
                </Dialog>

                {product.pdf && (
                  <a
                    href={product.pdf}
                    download={product.pdfName || `${product.id}-brochure.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 font-medium hover:bg-yellow-400 transition"
                  >
                    <Download className="h-4 w-4" /> Download PDF / Brochure
                  </a>
                )}
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 md:mt-24">
              <h2 className="text-2xl md:text-3xl font-light text-foreground">Related products</h2>
              <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {related.map((r) => (
                  <Link key={r.id} to={`/product/${r.id}`} className="group bg-card border border-border hover:border-primary transition overflow-hidden">
                    <div className="aspect-[4/3] bg-muted overflow-hidden">
                      <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" />
                    </div>
                    <div className="p-3 md:p-4">
                      <div className="text-xs text-muted-foreground">{r.brand}</div>
                      <div className="mt-1 text-sm md:text-base font-light text-foreground line-clamp-2 group-hover:text-primary">{r.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <CTABanner />
    </>
  );
}

export default ProductDetailPage;
