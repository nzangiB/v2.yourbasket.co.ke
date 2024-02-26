import "./breadcrumbs.scss";

export function Breadcrumbs (parent, child) {
  return `
      <div class="breadcrumbs">
        <div class="breadcrumb">
            <a class="breadcrumb" data-route="/">Home</a>
        </div>
        <div class="breadcrumb-spacer">></div>
        <div class="breadcrumb">
            <a class="breadcrumb" data-route="${parent.route}">${parent.name}</a>
        </div>
        <div class="breadcrumb-spacer">></div>
        <div class="breadcrumb">
            ${child?.slug}
        </div>
      </div>
    `;
}
