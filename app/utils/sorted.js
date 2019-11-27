import _ from "lodash-es";

const sortedStackList = (list) => {
    return _.orderBy(list.map((l) => ({...l, value: Number(l.value)})), 'value', 'desc');
}

export {sortedStackList}
