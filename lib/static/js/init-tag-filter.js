'use strict';


//---------//
// Imports //
//---------//

const $ = require('domtastic')
  , Awesomplete = require('awesomplete')
  , fp = require('lodash/fp')
  , notify = require('./notify')
  , render = require('./render')
  , selectedTagsAccessor = require('./selected-tags-accessor')
  , tags = require('../../api/tags')
  ;


//------//
// Init //
//------//

const allTags = fp.keys(tags)
  , noneYetEl = document.getElementById('none-yet')
  , noneYetDel = $(noneYetEl)
  , tagBucketEl = document.getElementById('tag-bucket')
  , tagBucketDel = $(tagBucketEl)
  , notification = getNotifications()
  ;


//------//
// Main //
//------//

const initTagFilter = () => {
  const tagFilter = document.getElementById('tag-filter')
    , awesompleteInst = new Awesomplete(tagFilter, { list: allTags })
    ;

  fp.each(
    fn => fn(tagFilter, awesompleteInst)
    , [attachEnterHandler, attachTabHandler]
  );
};


//-------------//
// Helper Fxns //
//-------------//

function attachEnterHandler(tagFilter, awesompleteInst) {
  tagFilter.addEventListener('keyup', e => {
    if (isEnter(e)) {
      const tagToAdd = e.target.value
        , status = getStatus(tagToAdd)
        ;

      if (status === 'success') {
        selectedTagsAccessor.add(tagToAdd);
        awesompleteInst.list = fp.without([tagToAdd], awesompleteInst._list);
        tagFilter.value = '';
        renderTagBucket(awesompleteInst);
      } else {
        notify(notification[status]);
      }
    }
  });
}

function renderTagBucket(awesompleteInst) {
  if (selectedTagsAccessor.isLaden()) {
    noneYetDel.addClass('absent');
    tagBucketEl.innerHTML = render(
      'tag-bucket'
      , { appliedTags: selectedTagsAccessor.get() }
    );
    tagBucketDel.children().each(tagEl => {
      const removeTag = createRemoveTag(tagEl, awesompleteInst)
        , removeIcon = $(tagEl).find('.remove')[0]
        ;

      removeIcon.addEventListener('click', removeTag);
      removeIcon.addEventListener('keyup', e => {
        if (isEnter(e) || isSpace(e)) {
          removeTag();
          e.preventDefault();
        }
      });
      removeIcon.addEventListener('keydown', e => {
        // this prevents the view from scrolling
        if (isSpace(e)) e.preventDefault();
      });
    });
  } else {
    noneYetDel.addClass('absent');
  }
}

function createRemoveTag(tagEl, awesompleteInst) {
  return () => {
    const tag = tagEl.getAttribute('data-tag');
    selectedTagsAccessor.remove(tag);
    tagEl.remove();
    awesompleteInst.list = fp.concat(awesompleteInst._list, [tag]);

    if (selectedTagsAccessor.isEmpty()) {
      noneYetDel.removeClass('absent');
    }
  };
}

function attachTabHandler(tagFilter, awesompleteInst) {
  tagFilter.addEventListener('keydown', e => {
    if (isTab(e) && awesompleteInst.opened) {
      awesompleteInst.next();
      e.preventDefault();
    }
  });
}

function isTab(e) {
  return e.key === 'Tab' || e.keyCode === 9;
}

function isEnter(e) {
  return e.key === 'Enter' || e.keyCode === 13;
}

function isSpace(e) {
  return e.key === ' ' || e.keycode === 32;
}

function getStatus(tagToAdd) {
  if (!fp.includes(tagToAdd, allTags)) {
    return 'invalid';
  } else if (fp.includes(tagToAdd, selectedTagsAccessor.get())) {
    return 'alreadyAdded';
  } else if (selectedTagsAccessor.get().length === 4) {
    return 'tooMany';
  }

  return 'success';
}

function getNotifications() {
  return {
    invalid: {
      message: "Tag doesn't exist"
      , polarity: 'error'
    }
    , alreadyAdded: {
      message: "Tag was already added"
      , polarity: 'error'
    }
    , tooMany: {
      message: "Up to four tags can be added"
      , polarity: 'error'
    }
  };
}


//---------//
// Exports //
//---------//

module.exports = initTagFilter;
