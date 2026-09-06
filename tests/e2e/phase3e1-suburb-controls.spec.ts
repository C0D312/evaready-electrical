import { expect, test, type Page, type Locator } from "./support/contained-test";
import { observeQuoteEnhancement, expectQuoteEnhancementReady } from "./support/quote-enhancement";
import { resolvePreviewUrl } from "./support/preview-url";
import { coverageRegions } from "../../data/service-area-coverage";

const representatives = [...new Set(coverageRegions.flatMap(region => {
  const rows = region.areas.flatMap(area => area.suburbs.map(suburb => ({name:suburb.name,route:`service-areas/${region.slug}/${area.slug}/${suburb.slug}/`})));
  return [rows[0].route,[...rows].sort((a,b)=>b.name.length-a.name.length)[0].route,
    ...region.areas.filter(area=>area.suburbs.length===1).map(area=>`service-areas/${region.slug}/${area.slug}/${area.suburbs[0].slug}/`)];
}))];

async function unobscured(page:Page,control:Locator) {
  const observations: unknown[]=[];
  let previous: {x:number;y:number;width:number;height:number}|undefined;
  try {
  // Scrolling has its own action timeout; measure the settled target separately.
  await control.scrollIntoViewIfNeeded();
  await expect.poll(async()=>{
    const state=await control.evaluate(element=>{
      const box=element.getBoundingClientRect();
      const hit=document.elementFromPoint(box.x+box.width/2,box.y+box.height/2);
      return {unobscured:Boolean(hit&&(hit===element||element.contains(hit))),box:box.toJSON(),hit:hit?.tagName,
        scrollY,innerWidth,innerHeight,clientWidth:document.documentElement.clientWidth,
        scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,
        visualViewport:visualViewport?{width:visualViewport.width,height:visualViewport.height,offsetTop:visualViewport.offsetTop,offsetLeft:visualViewport.offsetLeft,scale:visualViewport.scale}:null};
    });
    observations.push(state);
    const stable=previous&&Math.abs(previous.x-state.box.x)<=1&&Math.abs(previous.y-state.box.y)<=1
      &&Math.abs(previous.width-state.box.width)<=1&&Math.abs(previous.height-state.box.height)<=1;
    previous=state.box;
    return state.unobscured&&Boolean(stable);
  },{message:"Control must be naturally unobscured, including sticky CTA clearance"}).toBe(true);
  } finally {
    await test.info().attach("control-hit-observations",{body:JSON.stringify(observations),contentType:"application/json"});
  }
}

for(const route of representatives) {
  test(`${route}: reduced motion, final CTA, footer and menu at normal and enlarged text`,async({page,baseURL})=>{
    await observeQuoteEnhancement(page);
    await page.emulateMedia({reducedMotion:"reduce"});
    await page.goto(resolvePreviewUrl(String(baseURL),route).toString(),{waitUntil:"load"});
    await expectQuoteEnhancementReady(page);
    for(const scale of [100,200]) {
      await page.evaluate(async scale=>{
        document.documentElement.style.setProperty("font-size",`${scale}%`,"important");
        await document.fonts.ready;
        await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
      },scale);
      await expect.poll(()=>page.locator("main h1, main h2, main h3, main p").evaluateAll(elements=>elements.flatMap(element=>{
        const box=element.getBoundingClientRect();
        const range=document.createRange();range.selectNodeContents(element);
        const lines=new Set(Array.from(range.getClientRects(),rect=>Math.round(rect.top))).size;
        const minimum=Math.min(120,parseFloat(getComputedStyle(element).fontSize)*4);
        return lines>1&&box.width&&box.width<minimum?[{text:element.textContent,width:box.width,minimum}]:[];
      })),{message:`Readable text columns at ${scale}%`}).toEqual([]);
      const quote=page.locator('[data-location-section="final-action"] [data-quote-trigger="true"]');
      await unobscured(page,quote);
      await quote.focus();
      expect(await quote.evaluate(element=>{
        const style=getComputedStyle(element);
        return element.matches(":focus") && (style.outlineStyle!=="none"||style.boxShadow!=="none");
      })).toBe(true);
      const scrollBehavior=await page.evaluate(()=>document.documentElement.style.scrollBehavior);
      await page.keyboard.press("Enter");
      const dialog=page.getByRole("dialog",{name:"Request a quote"});
      await expect(dialog).toBeVisible();
      const close=dialog.locator(".quote-modal-close");
      // This test traverses the frame. Settle its inert document before testing
      // keyboard focus; the separate route tests retain immediate-open Escape.
      await expect(dialog.frameLocator("iframe").locator("body")).toContainText("No submission is possible.");
      await close.focus();
      await expect(close).toBeFocused();
      for(let n=0;n<5;n++) {
        await page.keyboard.press("Tab");
        expect(await page.evaluate(()=>Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true);
      }
      await close.focus();
      await expect(close).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
      await expect(quote).toBeFocused();
      // Closing restores scroll in the next frame. Do not race the subsequent
      // footer scroll or text-size change against that real cleanup callback.
      await expect.poll(()=>page.evaluate(()=>document.documentElement.style.scrollBehavior)).toBe(scrollBehavior);
      expect(await page.evaluate(()=>document.body.style.position)).toBe("");
      await unobscured(page,quote);
      const footer=page.locator("footer");
      await expect(footer).toHaveCount(1);
      const footerQuote=footer.locator('[data-quote-trigger="true"]').last();
      await unobscured(page,footerQuote);
      await expect(footerQuote).toHaveAttribute("href",/^https:\/\/book\.servicem8\.com\//);
      const menuButton=page.getByRole("button",{name:"Open navigation menu"});
      if(await menuButton.isVisible()) {
        await menuButton.click();
        const menu=page.getByRole("navigation",{name:"Mobile navigation"});
        await expect(menu).toBeVisible();
        await expect(page.locator("body")).toHaveClass(/mobile-menu-open/);
        expect(await page.evaluate(()=>document.body.style.position)).toBe("fixed");
        const before=await page.evaluate(()=>({top:document.body.style.top,y:scrollY}));
        await menu.evaluate(element=>{element.scrollTop=element.scrollHeight;});
        expect(await page.evaluate(()=>({top:document.body.style.top,y:scrollY}))).toEqual(before);
        await page.goBack();
        await expect(menu).toBeHidden();
        await expect(menuButton).toBeFocused();
        expect(await page.evaluate(()=>document.body.style.position)).toBe("");
      }
      expect(new URL(page.url()).pathname).toBe(`/evaready-electrical/${route}`);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
    }
  });
}
