const qs = require('querystring')
module.exports = {
  pagination: (api, query, page, limit, count) => {
    page = +page
    const pageInfo = {
      count: 0,
      pages: 0,
      currentPage: +page,
      limitPerPage: +limit,
      nextLink: null,
      prevLink: null
    }

    pageInfo.count = count
    pageInfo.pages = Math.ceil(count / limit)
    const { pages, currentPage } = pageInfo
    if (currentPage < pages) {
      pageInfo.nextLink = `http://localhost:8080/${api}?${qs.stringify({ ...query, ...{ page: page + 1 } })}`
    }

    if (currentPage > 1) {
      pageInfo.prevLink = `http://localhost:8080/${api}?${qs.stringify({ ...query, ...{ page: page - 1 } })}`
    }
    return pageInfo
  }
}