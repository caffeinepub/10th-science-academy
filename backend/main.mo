import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

// Run migration logic on upgrade.
(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var nextPageId = 0; // Next available page ID.
  var nextPostId = 0; // Next available post ID.

  // Persistent stores for pages, posts, and user profiles
  let pages = Map.empty<Nat, Page>();
  let posts = Map.empty<Nat, Post>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Data types.
  type Page = {
    id : Nat;
    title : Text;
    content : Text;
    author : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  type Post = {
    id : Nat;
    title : Text;
    body : Text;
    author : Principal;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  public type UserProfile = {
    name : Text;
  };

  // --- User Profile Functions ---

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // --- Page Functions ---

  public shared ({ caller }) func createPage(title : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create pages");
    };

    let pageId = nextPageId;
    nextPageId += 1;

    let currentTime = Time.now();

    let newPage : Page = {
      id = pageId;
      title;
      content;
      author = caller;
      createdAt = currentTime;
      updatedAt = currentTime;
    };

    pages.add(pageId, newPage);
    pageId;
  };

  public query ({ caller }) func getPage(pageId : Nat) : async ?Page {
    pages.get(pageId);
  };

  public shared ({ caller }) func updatePage(pageId : Nat, title : Text, content : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update pages");
    };
    switch (pages.get(pageId)) {
      case (null) { Runtime.trap("Page not found") };
      case (?oldPage) {
        if (oldPage.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the author or an admin can update this page");
        };
        let updatedPage : Page = {
          oldPage with
          title;
          content;
          updatedAt = Time.now();
        };
        pages.add(pageId, updatedPage);
      };
    };
  };

  public shared ({ caller }) func deletePage(pageId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete pages");
    };
    switch (pages.get(pageId)) {
      case (null) { Runtime.trap("Page not found") };
      case (?page) {
        if (page.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the author or an admin can delete this page");
        };
        pages.remove(pageId);
      };
    };
  };

  public query ({ caller }) func getAllPages() : async [Page] {
    pages.values().toArray();
  };

  // --- Post Functions ---

  public shared ({ caller }) func createPost(title : Text, body : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };

    let postId = nextPostId;
    nextPostId += 1;

    let currentTime = Time.now();

    let newPost : Post = {
      id = postId;
      title;
      body;
      author = caller;
      createdAt = currentTime;
      updatedAt = currentTime;
    };

    posts.add(postId, newPost);
    postId;
  };

  public query ({ caller }) func getPost(postId : Nat) : async ?Post {
    posts.get(postId);
  };

  public shared ({ caller }) func updatePost(postId : Nat, title : Text, body : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update posts");
    };
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?oldPost) {
        if (oldPost.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the author or an admin can update this post");
        };
        let updatedPost : Post = {
          oldPost with
          title;
          body;
          updatedAt = Time.now();
        };
        posts.add(postId, updatedPost);
      };
    };
  };

  public shared ({ caller }) func deletePost(postId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete posts");
    };
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        if (post.author != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only the author or an admin can delete this post");
        };
        posts.remove(postId);
      };
    };
  };

  public query ({ caller }) func getAllPosts() : async [Post] {
    posts.values().toArray();
  };
};
